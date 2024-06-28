/* c8 ignore start */
import * as T from 'win32-def/types'

import { User32_M } from './M.types.js'


export class User32_P extends User32_M {

  PeekMessageW: (
    lpMsg: T.LPMSG,
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

/* c8 ignore stop */
