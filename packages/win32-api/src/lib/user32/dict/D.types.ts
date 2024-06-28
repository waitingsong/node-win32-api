/* c8 ignore start */
import * as T from 'win32-def/types'

import { User32_C } from './C.types.js'


export class User32_D extends User32_C {

  DefWindowProcW: (hWnd: T.HWND, Msg: T.UINT, wParam: T.WPARAM, lParam: T.LPARAM) => T.LRESULT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-destroywindow */
  DestroyWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-dispatchmessagew */
  DispatchMessageW: (lpMsg: T.LPMSG) => T.LRESULT

}

/* c8 ignore stop */
