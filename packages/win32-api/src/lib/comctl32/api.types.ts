import * as T from 'win32-def'


export interface Win32Fns {
  InitCommonControlsEx: (lpInitCtrls: T.LPINITCOMMONCONTROLSEX) => T.BOOL
}

