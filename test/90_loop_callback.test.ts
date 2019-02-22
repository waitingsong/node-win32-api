/// <reference types="node" />
/// <reference types="mocha" />

import {
  basename,
} from '@waiting/shared-core'
import * as ffi from 'ffi-napi'
import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import * as StructDi from 'ref-struct-di'
import { interval, of, range } from 'rxjs'
import {
  concatMap,
  delay,
  switchMap,
  take,
  timeout,
} from 'rxjs/operators'

import {
  C,
  Config,
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
  K,
  U,
} from '../src/index'

const Struct = StructDi(ref)
const knl32 = K.load()
const user32 = U.load()  // load all apis defined in lib/{dll}/api from user32.dll
const comctl32 = C.load()  // load all apis defined in lib/{dll}/api from user32.dll

const filename = basename(__filename)

// WndProc
const WndProc = ffi.Callback('uint32',
  [W.HWND, W.UINT, W.WPARAM, W.LPARAM],
  (hwnd: M.HWND, uMsg: M.UINT, wParam: M.WPARAM, lParam: M.LPARAM) => {
    // console.info('WndProc callback: ', uMsg, wParam, lParam)
    let result = 0
    switch (uMsg) {
      default:
        result = user32.DefWindowProcW(<FM.FFIBuffer> hwnd, uMsg, wParam, lParam)
        break
    }
    // console.info('Sending LRESULT: ' + result + '\n')
    return result
  },
)

describe(filename, () => {
  it('Should WndProc works at more loops', done => {
    const loops = 1024
    const titlePrefix = 'win32-api-'
    const handle$ = of(createWindow(titlePrefix)).pipe(
      delay(3000),
    )
    const range$ = interval(10).pipe(
      take(loops),
    )
    const start = new Date().getTime()

    handle$.pipe(
      switchMap(hWnd => {
        return range$.pipe(
          concatMap(index => {
            const newTitle = titlePrefix + index
            changeTitle(hWnd, newTitle)
            return of(index)
          }),
        )
      }),
      timeout(50_000),
    )
      .subscribe(
        index => {
          assert(index + 1 <= loops, `index(${index}) exceed loops(${loops})`)
        },
        err => assert(false, err),
        () => {
          const end = new Date().getTime()
          const delta = end - start
          console.info(`elp ${delta}ms at ${loops} loops`)
          // avoid gc
          console.info('typeof WndProc is ' + typeof WndProc)
          done()
        },
      )

  })
})


function createWindow(title: string): Buffer {
  const className = Buffer.from('NodeClass\0', 'ucs-2')
  const windowName = Buffer.from('Node calc\0', 'ucs-2')

  const hInstance = ref.alloc(W.HINSTANCE)
  knl32.GetModuleHandleExW(0, null, hInstance)

  // Common Controls
  const icc = new Struct(DS.INITCOMMONCONTROLSEX)()

  icc.dwSize = 8
  icc.dwICC = 0x40ff
  comctl32.InitCommonControlsEx(icc.ref())


  // Window Class
  const wClass = new Struct(DS.WNDCLASSEX)()

  wClass.cbSize = Config._WIN64 ? 80 : 48 // x86 = 48, x64=80
  wClass.style = 0
  wClass.lpfnWndProc = WndProc
  wClass.cbClsExtra = 0
  wClass.cbWndExtra = 0
  wClass.hInstance = hInstance
  wClass.hIcon = null
  wClass.hCursor = null
  wClass.hbrBackground = null
  wClass.lpszMenuName = null
  wClass.lpszClassName = className
  wClass.hIconSm = null

  if (!user32.RegisterClassExW(wClass.ref())) {
    throw new Error('Error registering class')
  }
  // tslint:disable: no-bitwise
  const hWnd = user32.CreateWindowExW(
    0,
    className,
    windowName,
    0xcf0000, // overlapped window
    1 << 31, // use default
    1 << 31,
    600,
    400,
    null,
    null,
    hInstance,
    null,
  )

  user32.ShowWindow(hWnd, 1)
  user32.UpdateWindow(hWnd)

  changeTitle(hWnd, title)

  return hWnd
}

function changeTitle(handle: Buffer, title: string): string {
  if (handle && !ref.isNull(handle) && ref.address(handle)) {
    // Change title of the Calculator
    const res = user32.SetWindowTextW(handle, Buffer.from(title + '\0', 'ucs2'))

    if (!res) {
      // See: [System Error Codes] below
      const errcode = knl32.GetLastError()
      const len = 255
      const buf = Buffer.alloc(len)
      // tslint:disable-next-line
      const p = 0x00001000 | 0x00000200  // FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS
      const langid = 0x0409              // 0x0409: US, 0x0000: Neutral locale language
      const msglen = knl32.FormatMessageW(p, null, errcode, langid, buf, len, null)

      if (msglen) {
        const errmsg = ref.reinterpretUntilZeros(buf, 2).toString('ucs2')
        throw new Error(errmsg)
      }

      return ''
    }
    else {
      // const tt = getTitle(handle)
      return ''
    }
  }
  else {
    return ''
  }
}


export function getTitle(handle: Buffer): string {
  const len = 20
  const buf = Buffer.alloc(len * 2)

  user32.GetWindowTextW(handle, buf, len)
  const ret = buf.toString('ucs2').replace(/\0+$/, '')
  return ret
}
