import { type FLib, type LoadOptions, load as _load } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefUser32 } from './api.def.js'
import { User32 } from './api.types.js'
// for user32.constants
import * as constants from './constants.js'


export {
  DefUser32, User32, constants,
}

export const dllName = DllNames.user32
export type LibUser32 = FLib<User32>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<User32>({
  dll: dllName + '.dll',
  dllFuncs: DefUser32,
  usedFuncNames: fns,
})

