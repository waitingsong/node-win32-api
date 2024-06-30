import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'POINT'
const ptr = `${key}*` as const
const init: StructInitType = {
  x: D.LONG,
  y: D.LONG,
} as const

export const LPPOINT = ptr
export const POINT_Name = key
export const POINT_Init: typeof init = init

/**
 * POINT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-point
 */
export function POINT_Factory(): StructFactoryResult<POINT_Type> {
  return genStruct<POINT_Type>(init, key, ptr)
}

/**
 * POINT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-point
 */
export interface POINT_Type {
  x: T.LONG
  y: T.LONG
}
