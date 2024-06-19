import { ExpandFnModel, FnName, LoadSettings } from 'win32-def'

import { load as _load } from '../helper.js'
import { DllNames } from '../types.js'

import { Win32Fns } from './api.types.js'
import { apiDef } from './api.def.js'


export { apiDef }
export { Win32Fns }
export const dllName = DllNames.kernel32
/**
 * @deprecated use promise instead
 * ```ts
 * import { Kernel32 } from 'win32-api/promise'
 * const knl32 = Kernel32.load()
 * const times = await knl32.GetSystemTimes(...)
 * ```
 */
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => _load<ExpandFnModel<Win32Fns>>(dllName, apiDef, fns, settings)

