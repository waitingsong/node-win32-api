import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_D } from './CD.def.js'


export class DefUser32_E extends DefUser32_D {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumchildwindows */
  static EnumChildWindows = [D.BOOL, [D.HWND, D.WNDENUMPROC, D.LPARAM]]

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  static EnumDisplayDevicesW = [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumthreadwindows */
  static EnumThreadWindows = [D.BOOL, [D.DWORD, D.WNDENUMPROC, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows */
  static EnumWindows = [D.BOOL, [D.WNDENUMPROC, D.LPARAM]]

}

export class DefUser32_F extends DefUser32_E {

  /** https=//learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw */
  static FindWindowExW = [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]]

  static FlashWindow = [D.BOOL, [D.HWND, D.BOOL]]

  static FlashWindowEx = [D.BOOL, [S.PFLASHWINFO]]

}
