import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_M } from './IM.def.js'


export class DefUser32_P extends DefUser32_M {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-peekmessagew */
  static PeekMessageW = [D.BOOL, [`_Out_ ${S.LPMSG}`, D.HWND, D.UINT, D.UINT, D.UINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-postmessagew */
  static PostMessageW = [D.BOOL, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-printwindow */
  static PrintWindow = [D.BOOL, [D.HWND, D.HDC, D.UINT]]

}

export class DefUser32_R extends DefUser32_P {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-registerclassexw */
  static RegisterClassExW = [D.ATOM, [S.LPWNDCLASSEXW]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew */
  static RegisterWindowMessageW = [D.UINT, [D.LPCWSTR]]

}
