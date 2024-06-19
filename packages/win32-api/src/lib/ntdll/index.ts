import { ExpandFnModel, FnName, LoadSettings } from 'win32-def'

import { load as _load } from '../helper.js'
import { DllNames } from '../types.js'

import { Win32Fns } from './api.types.js'
import { apiDef } from './api.def.js'


export { apiDef }
export { Win32Fns }
export const dllName = DllNames.ntdll
/**
 * @deprecated use promise instead
 * ```ts
 * import { Ntdll } from 'win32-api/promise'
 * const ntdll = Ntdll.load()
 * const ntStatus = await ntdll.NtQueryInformationProcess(...)
 * ```
 */
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => _load<ExpandFnModel<Win32Fns>>(dllName, apiDef, fns, settings)

