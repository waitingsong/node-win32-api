import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'


export class DefComctl32 implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  /** https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex */
  static InitCommonControlsEx = [D.BOOL, [S.LPINITCOMMONCONTROLSEX]]
}
