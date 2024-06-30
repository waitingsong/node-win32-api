/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import type { DefComctl32 } from './api.def.js'


export class Comctl32 implements T.LibDef2Type<typeof DefComctl32> {
  /** https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex */
  InitCommonControlsEx: (lpInitCtrls: S.INITCOMMONCONTROLSEX_Type) => T.BOOL
}


/* c8 ignore stop */
