import assert from 'assert'

import type { FlattenNestedTuple } from '@waiting/shared-types'

import { getPRINTER_INFO_X_Ptr } from '##/index.struct.js'
import type { MultipleChoiceMapperList, MultipleChoiceMapper, MultipleChoiceMapperSet } from '##/index.types.js'
import { type Winspool, DefWinspool } from '#@/def.class/api.helper.js'


export const fnName = 'EnumPrintersW'
type Func = Winspool[typeof fnName]
type Params = Parameters<Func>

type DefFunc = typeof DefWinspool[typeof fnName]
type DefParams = FlattenNestedTuple<DefFunc[1]>

export const EnumPrintersW_mapper: MultipleChoiceMapper<Params, DefParams> = (name, runtimeArgs, defParamsArray) => {
  if (name !== fnName) { return }
  const argLevel = runtimeArgs[2]
  const argPtr = getPRINTER_INFO_X_Ptr(argLevel)
  assert(argPtr, `getPRINTER_INFO_X_Ptr(${argLevel}) failed`)

  for (const row of defParamsArray) {
    assert(Array.isArray(row))
    const defPtr = row[3] as typeof argPtr
    if (defPtr.endsWith(argPtr)) {
      return row
    }
  }
  // return [] // will throw Error
}

export const multipleChoiceMapperList: MultipleChoiceMapperList = new Map()
export const multipleChoiceMapperSet: MultipleChoiceMapperSet = new Set()
multipleChoiceMapperList.set(fnName, multipleChoiceMapperSet)
multipleChoiceMapperSet.add(EnumPrintersW_mapper)

