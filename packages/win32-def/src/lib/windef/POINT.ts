import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


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
export function POINT_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
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

