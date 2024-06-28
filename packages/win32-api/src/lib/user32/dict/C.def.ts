import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_B } from './B.def.js'


export class DefUser32_C extends DefUser32_B {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-clienttoscreen */
  static ClientToScreen = [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]]

  static CloseWindow = [D.BOOL, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowexw */
  static CreateWindowExW = [
    D.HWND, [
      D.DWORD,
      D.LPCTSTR,
      D.LPCTSTR,
      D.DWORD,
      D.INT,
      D.INT,
      D.INT,
      D.INT,
      D.HWND,
      D.HMENU,
      D.HINSTANCE,
      D.LPVOID,
    ],
  ]

}

