import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_D } from './D.def.js'


export class DefUser32_E extends DefUser32_D {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  static EnumDisplayDevicesW = [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumthreadwindows */
  static EnumThreadWindows = [D.BOOL, [D.DWORD, D.WNDENUMPROC, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows */
  static EnumWindows = [D.BOOL, [D.WNDENUMPROC, D.LPARAM]]

}

