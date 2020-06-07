import { DModel as M, DTypes as W, FModel as FM } from 'win32-def'


export interface Win32Fns extends FM.DllFuncsModel {
  InitCommonControlsEx: (lpInitCtrls: M.INITCOMMONCONTROLSEX) => M.BOOL
}

export const apiDef: FM.DllFuncs = {
  InitCommonControlsEx: [W.BOOL, [W.LPINITCOMMONCONTROLSEX] ],
}
