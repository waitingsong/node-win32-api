import * as M from 'win32-def'
import * as W from 'win32-def/common.def'


export interface Win32Fns {
  InitCommonControlsEx: (lpInitCtrls: M.LPINITCOMMONCONTROLSEX) => M.BOOL
}


export const apiDef: M.DllFuncs<Win32Fns> = {
  InitCommonControlsEx: [W.BOOL, [W.LPINITCOMMONCONTROLSEX] ],
}

