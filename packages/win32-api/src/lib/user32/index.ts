import { FnName, LoadSettings } from 'win32-def'

import { loadAsync as _load } from '../helper.js'
import { DllNames } from '../types.js'

import { apiDef } from './api.def.js'
import { Win32Fns } from './api.types.js'
// for user32.constants
import * as constants from './constants.js'


export { apiDef }
export { constants }
export { Win32Fns }
export const dllName = DllNames.user32
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => _load<Win32Fns>(dllName, apiDef, fns, settings)

