/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import { User32_D } from './CD.types.js'


export class User32_E extends User32_D {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumchildwindows */
  EnumChildWindows: (hWndParent: T.HWND, lpEnumFunc: T.WNDENUMPROC, lParam: T.LPARAM) => T.BOOL

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  EnumDisplayDevicesW: (
    lpDevice: T.LPCWSTR | null,
    iDevNum: T.DWORD,
    lpDisplayDevice: S.DISPLAY_DEVICEW_Type,
    dwFlags: T.DWORD,
  ) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumthreadwindows */
  EnumThreadWindows: (dwThreadId: T.DWORD, lpfn: T.WNDENUMPROC, lParam: T.LPARAM) => T.BOOL

  /**
   * EnumWindows: EnumWindows
   * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows
   */
  EnumWindows: (lpEnumFunc: T.WNDENUMPROC, lParam: T.LPARAM) => T.BOOL

}

export class User32_F extends User32_E {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw */
  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND

  FlashWindow: (hWnd: T.HWND, bInvert: T.BOOL) => T.BOOL

  FlashWindowEx: (pfwi: S.FLASHWINFO_Type) => T.BOOL

}

/* c8 ignore stop */
