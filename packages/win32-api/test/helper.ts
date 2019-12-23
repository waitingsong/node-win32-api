/// <reference types="node" />
/// <reference types="mocha" />
import * as ffi from 'ffi-napi'
import * as ref from 'ref-napi'
import * as StructDi from 'ref-struct-di'
import { of, Observable } from 'rxjs'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import {
  C,
  Config,
  K,
  U,
} from '../src/index'


export const Struct = StructDi(ref)
export const knl32 = K.load()
export const user32 = U.load()
export const comctl32 = C.load()

/** WndProc */
export function createWndProc(): M.WNDPROC {
  const WndProc = ffi.Callback(
    W.UINT32,
    [W.HWND, W.UINT, W.WPARAM, W.LPARAM],
    (hwnd: M.HWND, uMsg: M.UINT, wParam: M.WPARAM, lParam: M.LPARAM) => {
      // console.info('WndProc callback: ', uMsg, wParam, lParam)
      let result = 0
      switch (uMsg) {
        default:
          result = user32.DefWindowProcW(hwnd as FM.FFIBuffer, uMsg, wParam, lParam)
          break
      }
      // console.info('Sending LRESULT: ' + result + '\n')
      return result
    },
  )

  process.on('exit', () => {
    // tslint:disable-next-line:no-unused-expression
    WndProc // avoid gc
  })

  return WndProc
}

export function createWindow(wndProc: M.WNDPROC): Observable<M.HWND> {
  const className = Buffer.from('NodeClass\0', 'ucs2')
  const windowName = Buffer.from('Node calc\0', 'ucs2')

  const hInstance = ref.alloc(W.HINSTANCE)
  knl32.GetModuleHandleExW(0, ref.NULL, hInstance)

  // Common Controls
  const icc: M.INITCOMMONCONTROLSEX_Struct = new Struct(DS.INITCOMMONCONTROLSEX)()
  icc.dwSize = 8
  icc.dwICC = 0x40ff
  comctl32.InitCommonControlsEx(icc.ref())

  // Window Class
  const wClass: M.WNDClASSEX_Struct = new Struct(DS.WNDCLASSEX)()

  wClass.cbSize = Config._WIN64 ? 80 : 48 // x64=80, x86=48
  wClass.style = 0
  wClass.lpfnWndProc = wndProc
  wClass.cbClsExtra = 0
  wClass.cbWndExtra = 0
  wClass.hInstance = hInstance
  wClass.hIcon = ref.NULL
  wClass.hCursor = ref.NULL
  wClass.hbrBackground = ref.NULL
  wClass.lpszMenuName = ref.NULL
  wClass.lpszClassName = className
  wClass.hIconSm = ref.NULL

  if (! user32.RegisterClassExW(wClass.ref())) {
    throw new Error('Error registering class')
  }
  // tslint:disable: no-bitwise
  const hWnd: M.HWND = user32.CreateWindowExW(
    0,
    className,
    windowName,
    0xcf0000, // overlapped window
    1 << 31, // use default
    1 << 31,
    600,
    400,
    ref.NULL,
    ref.NULL,
    hInstance,
    ref.NULL,
  )

  if (hWnd && ! ref.isNull(hWnd) && ref.address(hWnd)) {
    user32.ShowWindow(hWnd, 1)
    user32.UpdateWindow(hWnd)

    return of(hWnd)
  }
  else {
    throw new Error('CreateWindowExW() failed')
  }

}

export function changeTitle(handle: M.HANDLE, title: string): string {
  if (handle && ! ref.isNull(handle) && ref.address(handle)) {
    // Change title of the Calculator
    const res = user32.SetWindowTextW(handle, Buffer.from(title + '\0', 'ucs2'))

    if (! res) {
      throw new Error('changeTitle failed')
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


export function changeTitleAsync(handle: M.HANDLE, title: string): Promise<string> {
  return Promise.resolve(changeTitle(handle, title))
}


export function getTitle(handle: M.HANDLE): string {
  const buf = Buffer.alloc(256)
  user32.GetWindowTextW(handle, buf, buf.byteLength)
  const ret = buf.toString('ucs2').replace(/\0+$/, '')

  return ret
}

export function destroyWin(hWnd: M.HWND): M.BOOL {
  return user32.DestroyWindow(hWnd)
}
