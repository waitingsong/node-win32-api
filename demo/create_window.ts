/**
 * Create a window and receive events
 * window closed after 30sec if event triggered
 *
 * Run @CLI and then move mouse in the area of the window
 *
 * @CLI `ts-node -P tsconfig.cjs.json demo/create_window.ts`
 * @author waiting
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as ffi from 'ffi'
import * as ref from 'ref'
import * as Struct from 'ref-struct'

// import {
//   C,
//   Config,
//   DModel as M,
//   DStruct as DS,
//   DTypes as W,
//   FModel as FM,
//   K,
//   U,
// } from 'win32-api' // as module
import {
  C,
  Config,
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
  K,
  U,
} from '../src/index' // as local


const knl32 = K.load()
const user32 = U.load()  // load all apis defined in lib/{dll}/api from user32.dll
const comctl32 = C.load()  // load all apis defined in lib/{dll}/api from user32.dll

// WndProc
const WndProc = ffi.Callback('uint32',
  [W.HWND, W.UINT, W.WPARAM, W.LPARAM],
  (hwnd: M.HWND, uMsg: M.UINT, wParam: M.WPARAM, lParam: M.LPARAM) => {
    console.info('WndProc callback: ', uMsg, wParam, lParam)
    let result = 0
    switch (uMsg) {
      default:
        result = user32.DefWindowProcW(<FM.FFIBuffer> hwnd, uMsg, wParam, lParam)
        break
    }
    console.info('Sending LRESULT: ' + result + '\n')
    return result
  },
)

createWindow('Node.js new window')

// message loop
const msg = new Struct(DS.MSG)()
const point = new Struct(DS.POINT)()

msg.pt = point.ref()

let count = 0
const countLimit = 500
const start = new Date().getTime()
const ttl = 30 // sec

while (count < countLimit && user32.GetMessageW(msg.ref(), null, 0, 0)) {
  count++
  console.info('---------- count: ' + count + ' ------------')

  const end = new Date().getTime()
  const delta = end - start
  if (delta > ttl * 1000) {
    console.info(`timeout and exit. count: ${count}`)
    console.info(`elp ${delta}ms`)
    process.exit(0)
  }
  else if (count >= countLimit) {
    console.info('countLimit and exit.')
    console.info(`elp ${delta}ms`)
    process.exit(0)
  }

  user32.TranslateMessageEx(msg.ref())
  user32.DispatchMessageW(msg.ref())
}

// avoid gc
process.on('exit', () => {
  console.info('typeof WndProc is ' + typeof WndProc)
  console.info(`${count} loops`)
})


function createWindow(title: string): Buffer {
  const className = Buffer.from('NodeClass\0', 'ucs-2')
  const windowName = Buffer.from('Node.js WinForms App\0', 'ucs-2')

  // const hmodule = kernel32.GetModuleHandleW(null);
  // const hInstance = Buffer.alloc(8);
  const hInstance = ref.alloc(W.HINSTANCE)
  knl32.GetModuleHandleExW(0, null, hInstance)

  // Common Controls
  const icc: M.InitCommonControlsEXStruct = new Struct(DS.INITCOMMONCONTROLSEX)()
  icc.dwSize = 8
  icc.dwICC = 0x40ff
  comctl32.InitCommonControlsEx(icc.ref())

  // Window Class
  const wClass: M.WndClassEXStruct = new Struct(DS.WNDCLASSEX)()
  wClass.cbSize = Config._WIN64 ? 80 : 48 // x86 = 48, x64=80
  wClass.style = 0
  wClass.lpfnWndProc = WndProc
  wClass.cbClsExtra = 0
  wClass.cbWndExtra = 0
  // wClass.hInstance = ref.ref(hmodule);
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


function changeTitle(hWnd: Buffer, title: string): string {
  if (hWnd && !ref.isNull(hWnd) && ref.address(hWnd)) {
    // Change title of the Calculator
    const res = user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))

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
