import { DllFuncs } from 'win32-def'
import * as D from 'win32-def/def'
import { Win32Fns } from './api.types.js'


export const apiDef: DllFuncs<Win32Fns> = {
  InitCommonControlsEx: [D.BOOL, [D.LPINITCOMMONCONTROLSEX] ],
}

