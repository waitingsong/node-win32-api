import { load as _load } from 'win32-def'
import type { FLib, LoadOptions } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefSpoolss } from './api.def.js'
import { Spoolss } from './api.types.js'


export {
  DefSpoolss, Spoolss,
}

export const dllName = DllNames.spoolss
export type LibSpool = FLib<Spoolss>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<Spoolss>({
  dll: dllName + '.dll',
  dllFuncs: DefSpoolss,
  usedFuncNames: fns,
})

