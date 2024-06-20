import { type LibFuncs, type LoadOptions, load as _load } from 'win32-def'

import { DllNames } from '../types.js'

import { apiDef } from './api.def.js'
import { Win32Fns } from './api.types.js'


export { apiDef }
export { Win32Fns }

export const dllName = DllNames.kernel32
export type LibFns = LibFuncs<Win32Fns>

export const load = (fns?: LoadOptions['usedFuncNames'], settings?: LoadOptions['settings']) => _load<Win32Fns>({
  dll: dllName + '.dll',
  dllFuncs: apiDef,
  usedFuncNames: fns,
  settings,
})

