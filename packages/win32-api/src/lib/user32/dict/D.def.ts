import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_C } from './C.def.js'


export class DefUser32_D extends DefUser32_C {

  static DefWindowProcW = [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-destroywindow */
  static DestroyWindow = [D.BOOL, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-dispatchmessagew */
  static DispatchMessageW = [D.LRESULT, [S.LPMSG]]

}

