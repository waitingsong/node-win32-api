import { type LoadOptions, load as _load } from 'win32-def'

import { DllNames } from '../types.js'

import { apiDef } from './api.def.js'
import { Win32Fns } from './api.types.js'
// for user32.constants
import * as constants from './constants.js'


export { apiDef }
export { constants }
export { Win32Fns }
export const dllName = DllNames.user32

export const load = (fns?: LoadOptions['usedFuncNames'], settings?: LoadOptions['settings']) => _load<Win32Fns>({
  dll: dllName + '.dll',
  dllFuncs: apiDef,
  usedFuncNames: fns,
  settings,
})

