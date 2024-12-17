import assert from 'node:assert'

import type { FlattenNestedTuple } from '@waiting/shared-types'
import { WString } from 'win32-def/def'
import type { MultipleChoiceMapper } from 'win32-def/types'

import type { DefUser32 as Def } from '../api.def.js'
import type { User32 as Lib } from '../api.types.js'


export const funcName = 'GetClassInfoExW'
type Func = Lib[typeof funcName]
type Params = Parameters<Func>

type DefFunc = typeof Def[typeof funcName]
type DefParams = FlattenNestedTuple<DefFunc[1]>

export const GetClassInfoExW_mapper: MultipleChoiceMapper<Params, DefParams> = (name, runtimeArgs, defParamsArray) => {
  if (name !== funcName) { return }
  const lpszClass = runtimeArgs[1]

  for (const row of defParamsArray) {
    assert(Array.isArray(row))
    const defArg = row[1]

    // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
    switch (typeof lpszClass) {
      case 'string': {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (defArg === WString) { // WString
          return row
        }
        break
      }

      case 'object': {
        assert(lpszClass instanceof Buffer, 'Invalid lpszClass type, must Buffer if object')
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (defArg === WString) { // WString
          return row
        }
        break
      }

      default:
        throw new Error(`Invalid lpszClass type: ${typeof lpszClass}`)
    }
  }
  // return [] // will throw Error
}


