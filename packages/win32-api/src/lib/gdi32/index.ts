import { ExpandFnModel, FnName, LoadSettings } from 'win32-def'

import { load as hload } from '../helper.js'
import { DllNames } from '../types.js'

import { apiDef, Win32Fns } from './api.js'


export { apiDef }
export { Win32Fns }
export const dllName = DllNames.gdi32
/**
 * @deprecated use promise instead
 * ```ts
 * import { User32 } from 'win32-api/promise'
 * const user32 = User32.load()
 * const hWnd = await user32.FindWindowExW(...)
 * ```
 */
export const load = (
  fns?: FnName[],
  settings?: LoadSettings,
) => hload<ExpandFnModel<Win32Fns>>(dllName, apiDef, fns, settings)

