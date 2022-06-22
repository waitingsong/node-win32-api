import { FModel } from 'win32-def'

import { load as hload } from '../helper.js'
import { DllNames } from '../model.js'

import { apiDef, Win32Fns } from './api.js'
// for user32.constants
import * as constants from './constants.js'


export { apiDef }
export { constants }
export { Win32Fns }
export const dllName = DllNames.user32
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const load = (
  fns?: FModel.FnName[],
  settings?: FModel.LoadSettings,
) => hload<FModel.ExpandFnModel<Win32Fns>>(dllName, apiDef, fns, settings)

