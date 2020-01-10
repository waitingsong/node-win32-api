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

  // process.on('exit', () => {
  //   typeof WndProc // avoid gc
  // })

  return WndProc
}

export function createWindow(wndProc: M.WNDPROC): M.HWND {
  const className = Buffer.from('NodeClass\0', 'ucs2')
  const windowName = Buffer.from('Node calc\0', 'ucs2')

  // Common Controls
  const icc: M.INITCOMMONCONTROLSEX_Struct = new Struct(DS.INITCOMMONCONTROLSEX)()
  icc.dwSize = 8
  icc.dwICC = 0x40ff
  comctl32.InitCommonControlsEx(icc.ref())

  // @DEBUG
  const wc = DS.WNDCLASSEX
  const wparm = W.WPARAM
  const lparm = W.LPARAM
  // Window Class
  const wClass: M.WNDClASSEX_Struct = new Struct(DS.WNDCLASSEX)()

  wClass.cbSize = wClass.ref().byteLength
  wClass.style = 0
  wClass.lpfnWndProc = wndProc
  wClass.cbClsExtra = 0
  wClass.cbWndExtra = 0
  wClass.hInstance = ref.NULL
  wClass.hIcon = ref.NULL
  wClass.hCursor = ref.NULL
  wClass.hbrBackground = ref.NULL
  wClass.lpszMenuName = ref.NULL
  wClass.lpszClassName = className
  wClass.hIconSm = ref.NULL

  if (! user32.RegisterClassExW(wClass.ref())) {
    throw new Error('Error registering class')
  }
  // const dStyle = U.constants.WS_OVERLAPPEDWINDOW
  const dStyle = U.constants.WS_CAPTION | U.constants.WS_SYSMENU
  const hWnd: M.HWND = user32.CreateWindowExW(
    0,
    className,
    windowName,
    dStyle, // overlapped window
    U.constants.CW_USEDEFAULT,
    U.constants.CW_USEDEFAULT,
    600,
    400,
    ref.NULL,
    ref.NULL,
    ref.NULL,
    ref.NULL,
  )

  if (hWnd && ! ref.isNull(hWnd) && ref.address(hWnd)) {
    user32.ShowWindow(hWnd, 1)
    user32.UpdateWindow(hWnd)

    return hWnd
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
