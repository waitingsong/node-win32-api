import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_B } from './AB.def.js'


export class DefUser32_C extends DefUser32_B {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-callwindowprocw */
  static CallWindowProcW = [D.LRESULT, [D.WNDPROC, D.HWND, D.UINT, D.WPARAM, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-changedisplaysettingsexw */
  static ChangeDisplaySettingsExW = [D.LONG, [D.WString, S.LPDEVMODEW, D.HWND, D.DWORD, D.LPVOID]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-clienttoscreen */
  static ClientToScreen = [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]]

  static CloseWindow = [D.BOOL, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowexw */
  static CreateWindowExW = [
    D.HWND, [
      D.DWORD,
      D.WString,
      D.WString,
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


export class DefUser32_D extends DefUser32_C {

  static DefWindowProcW = [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-destroywindow */
  static DestroyWindow = [D.BOOL, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-dispatchmessagew */
  static DispatchMessageW = [D.LRESULT, [S.LPMSG]]

}
