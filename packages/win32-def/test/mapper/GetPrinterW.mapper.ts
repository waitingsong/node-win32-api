import assert from 'assert'

import type { FlattenNestedTuple } from '@waiting/shared-types'
import { getPRINTER_INFO_X_Ptr } from 'win32-def/struct'
import type { EnumPrinters_Level, MultipleChoiceMapper } from 'win32-def/types'

import { DefWinspool } from '#@/def.class/api.helper.js'
import type { Winspool } from '#@/def.class/api.helper.js'


export const funcName = 'GetPrinterW'
type Func = Winspool[typeof funcName]
type Params = Parameters<Func>

type DefFunc = typeof DefWinspool[typeof funcName]
type DefParams = FlattenNestedTuple<DefFunc[1]>

export const GetPrinterW_mapper: MultipleChoiceMapper<Params, DefParams> = (name, runtimeArgs, defParamsArray) => {
  if (name !== funcName) { return }
  const argLevel = runtimeArgs[1] as EnumPrinters_Level
  const argPtr = getPRINTER_INFO_X_Ptr(argLevel)
  assert(argPtr, `getPRINTER_INFO_X_Ptr(${argLevel}) failed`)

  for (const row of defParamsArray) {
    assert(Array.isArray(row))
    const defPtr = row[2] as typeof argPtr
    if (defPtr.endsWith(argPtr)) {
      return row
    }
  }
  // return [] // will throw Error
}


