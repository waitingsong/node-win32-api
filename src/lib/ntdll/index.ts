import { DllNames } from '../conf'
import { load as hload } from '../helper'
import * as GT from '../types'

import { apiDef, Win32Fns } from './api'

export { apiDef }
export { Win32Fns }
export const dllName = DllNames.ntdll
export const load = (fns?: GT.FnName[], settings?: GT.LoadSettings) => hload<Win32Fns>(dllName, apiDef, fns, settings)
