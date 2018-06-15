import * as GT from '../types'
import W from '../windef-parsed'


export interface Win32Fns {
  InitCommonControlsEx(lpInitCtrls: GT.INITCOMMONCONTROLSEX): GT.BOOL
}

export const apiDef: GT.ApiDef = {
  InitCommonControlsEx: [W.BOOL, [W.LPINITCOMMONCONTROLSEX] ],
}
