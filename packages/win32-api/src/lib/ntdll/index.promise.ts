import { FnName, LoadSettings } from 'win32-def'

import { loadAsync as hload } from '../helper.js'
import { DllNames } from '../types.js'

import { Win32Fns } from './api.types.js'
import { apiDef } from './api.def.js'


export { apiDef }
export { Win32Fns }
export const dllName = DllNames.ntdll
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => hload<Win32Fns>(dllName, apiDef, fns, settings)

