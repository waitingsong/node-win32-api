
import { basename } from 'path'

import { load as hload } from '../helper'
import * as GT from '../types'

import { apiDef, Win32Fns } from './api'
import * as constants from './constants'

export { apiDef }
export { constants }
export { Win32Fns }
export const dllName = basename(__dirname)
export const load = (fns?: GT.FnName[], settings?: GT.LoadSettings) => hload<Win32Fns>(dllName, apiDef, fns, settings)
