import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_E } from './E.def.js'


export class DefUser32_F extends DefUser32_E {

  /** https=//learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw */
  static FindWindowExW = [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]]

  static FlashWindow = [D.BOOL, [D.HWND, D.BOOL]]

  static FlashWindowEx = [D.BOOL, [S.PFLASHWINFO]]

}

