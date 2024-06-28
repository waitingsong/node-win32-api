import * as D from 'win32-def/def'

import { DefUser32_M } from './M.def.js'


export class DefUser32_P extends DefUser32_M {

  static PeekMessageW = [D.BOOL, [D.LPMSG, D.HWND, D.UINT, D.UINT, D.UINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-postmessagew */
  static PostMessageW = [D.BOOL, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-printwindow */
  static PrintWindow = [D.BOOL, [D.HWND, D.HDC, D.UINT]]

}

