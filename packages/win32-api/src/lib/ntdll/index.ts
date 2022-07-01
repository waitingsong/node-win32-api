import { ExpandFnModel, FnName, LoadSettings } from 'win32-def'

import { load as hload } from '../helper.js'
import { DllNames } from '../types.js'

import { apiDef, Win32Fns } from './api.js'


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
) => hload<ExpandFnModel<Win32Fns>>(dllName, apiDef, fns, settings)

