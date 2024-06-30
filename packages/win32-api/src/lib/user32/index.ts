import { load as _load } from 'win32-def'
import type { FLib, LoadOptions } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefUser32 } from './api.def.js'
import { User32 } from './api.types.js'
import { multipleChoiceMapperList } from './mapper/index.mapper.js'


export {
  DefUser32, User32,
}

export const dllName = DllNames.user32
export type LibUser32 = FLib<User32>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<User32>({
  dll: dllName + '.dll',
  dllFuncs: DefUser32,
  usedFuncNames: fns,
  multipleChoiceMapperList: multipleChoiceMapperList,
})

