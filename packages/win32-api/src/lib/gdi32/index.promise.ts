import { FnName, LoadSettings } from 'win32-def'

import { loadAsync as hload } from '../helper.js'
import { DllNames } from '../types.js'

import { apiDef, Win32Fns } from './api.js'


export { apiDef }
export { Win32Fns }
export const dllName = DllNames.gdi32
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => hload<Win32Fns>(dllName, apiDef, fns, settings)

