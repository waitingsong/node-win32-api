import { load as _load } from 'win32-def'
import type { FLib, LoadOptions } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefComctl32 } from './api.def.js'
import { Comctl32 } from './api.types.js'


export {
  Comctl32,
  DefComctl32,
}

export const dllName = DllNames.comctl32
export type LibComctl32 = FLib<Comctl32>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<Comctl32>({
  dll: dllName + '.dll',
  dllFuncs: DefComctl32,
  usedFuncNames: fns,
})

