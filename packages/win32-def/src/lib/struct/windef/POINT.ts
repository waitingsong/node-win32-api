import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'POINT'
const ptr = `${key} *`
const init = {
  x: D.LONG,
  y: D.LONG,
} as const


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

export const LPPOINT = ptr
export const POINT_Init = init

