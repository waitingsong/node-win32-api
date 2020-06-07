import { FModel } from 'win32-def'

import { load as hload } from '../helper'
import { DllNames } from '../model'

import { apiDef, Win32Fns } from './api'
import * as constants from './constants'


export { apiDef }
export { constants }
export { Win32Fns }
export const dllName = DllNames.user32
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const load = (
  fns?: FModel.FnName[],
  settings?: FModel.LoadSettings,
) => hload<FModel.ExpandFnModel<Win32Fns>>(dllName, apiDef, fns, settings)

