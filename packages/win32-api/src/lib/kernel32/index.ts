import { load as _load } from 'win32-def'
import type { FLib, LoadOptions } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefKernel32 } from './api.def.js'
import { Kernel32 } from './api.types.js'


export {
  DefKernel32, Kernel32,
}

export const dllName = DllNames.kernel32
export type LibKernel32 = FLib<Kernel32>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<Kernel32>({
  dll: dllName + '.dll',
  dllFuncs: DefKernel32,
  usedFuncNames: fns,
})

