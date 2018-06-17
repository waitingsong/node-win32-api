import { DModel as DM, DTypes as DT, FModel } from 'win32-def'


export interface Win32Fns {
  InitCommonControlsEx(lpInitCtrls: DM.INITCOMMONCONTROLSEX): DM.BOOL
}

export const apiDef: FModel.DllFuncs = {
  InitCommonControlsEx: [DT.BOOL, [DT.LPINITCOMMONCONTROLSEX] ],
}
