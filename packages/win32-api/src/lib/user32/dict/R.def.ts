import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_P } from './P.def.js'


export class DefUser32_R extends DefUser32_P {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-registerclassexw */
  static RegisterClassExW = [D.ATOM, [S.LPWNDCLASSEXW]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew */
  static RegisterWindowMessageW = [D.UINT, [D.LPCWSTR]]

}

