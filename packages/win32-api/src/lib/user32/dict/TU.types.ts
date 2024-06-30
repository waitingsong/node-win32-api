/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import { User32_S } from './S.types.js'


export class User32_T extends User32_S {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-translatemessage */
  TranslateMessage: (lpMsg: S.MSG_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/winmsg/translatemessageex */
  TranslateMessageEx: (lpMsg: S.MSG_Type) => T.BOOL

}

export class User32_U extends User32_T {

  UnhookWinEvent: (hWinEventHook: T.HWINEVENTHOOK) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-unregisterclassw */
  UnregisterClassW: (lpClassName: T.LPCTSTR | T.ATOM, hInstance: T.HINSTANCE) => T.BOOL

  UpdateWindow: (hWnd: T.HWND) => T.BOOL

}

/* c8 ignore stop */
