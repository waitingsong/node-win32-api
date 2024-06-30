import { load as _load } from 'win32-def'
import type { FLib, LoadOptions } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefGdi32 } from './api.def.js'
import { Gdi32 } from './api.types.js'


export {
  DefGdi32, Gdi32,
}

export const dllName = DllNames.gdi32
export type LibGdi32 = FLib<Gdi32>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<Gdi32>({
  dll: dllName + '.dll',
  dllFuncs: DefGdi32,
  usedFuncNames: fns,
})

