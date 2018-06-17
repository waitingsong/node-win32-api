import { DModel as M, DTypes as W, FModel } from 'win32-def'


export interface Win32Fns {
  InitCommonControlsEx(lpInitCtrls: M.INITCOMMONCONTROLSEX): M.BOOL
}

export const apiDef: FModel.DllFuncs = {
  InitCommonControlsEx: [W.BOOL, [W.LPINITCOMMONCONTROLSEX] ],
}
