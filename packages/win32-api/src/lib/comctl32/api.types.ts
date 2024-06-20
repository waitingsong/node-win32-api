import * as T from 'win32-def'
import * as S from 'win32-def/struct'


export interface Win32Fns {
  InitCommonControlsEx: (lpInitCtrls: S.INITCOMMONCONTROLSEX_Type) => T.BOOL
}

