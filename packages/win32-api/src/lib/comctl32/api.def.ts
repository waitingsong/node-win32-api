import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {
  InitCommonControlsEx: [D.BOOL, [D.LPINITCOMMONCONTROLSEX]],
}

