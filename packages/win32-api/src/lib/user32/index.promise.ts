import { FnName, LoadSettings } from 'win32-def'

import { loadAsync as hload } from '../helper.js'
import { DllNames } from '../types.js'

import { apiDef, Win32Fns } from './api.js'
// for user32.constants
import * as constants from './constants.js'


export { apiDef }
export { constants }
export { Win32Fns }
export const dllName = DllNames.user32
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => hload<Win32Fns>(dllName, apiDef, fns, settings)

