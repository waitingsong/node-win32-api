import { load as _load } from 'win32-def'
import type { FLib, LoadOptions } from 'win32-def'

import { DllNames } from '##/lib/types.js'

import { DefWinspool } from './api.def.js'
import { Winspool } from './api.types.js'
import { multipleChoiceMapperList } from './mapper/index.mapper.js'


export {
  DefWinspool, Winspool,
}

export const dllName = DllNames.winspool
export type LibWinspool = FLib<Winspool>

export const load = (fns?: LoadOptions['usedFuncNames']) => _load<Winspool>({
  dll: dllName,
  dllFuncs: DefWinspool,
  usedFuncNames: fns,
  multipleChoiceMapperList: multipleChoiceMapperList,
})

