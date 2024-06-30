/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import { User32_M } from './IM.types.js'


export class User32_P extends User32_M {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-peekmessagew */
  PeekMessageW: (
    lpMsg: S.MSG_Type,
    HWND: T.HWND,
    wMsgFilterMin: T.UINT,
    wMsgFilterMax: T.UINT,
    wRemoveMsg: T.UINT,
  ) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-postmessagew */
  PostMessageW: (hWnd: T.HWND | null, Msg: T.UINT, wPARAM: T.WPARAM, lPARAM: T.LPARAM) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-printwindow */
  PrintWindow: (
    hwnd: T.HWND,
    hdcBlt: T.HDC,
    nFlags: T.UINT,
  ) => T.BOOL

}

export class User32_R extends User32_P {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-registerclassexw */
  RegisterClassExW: (lpwcx: S.WNDCLASSEXW_Type) => T.ATOM

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew */
  RegisterWindowMessageW: (lpString: T.LPCWSTR) => T.UINT

}

/* c8 ignore stop */
