import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genSimpleStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'POINT'
const ptr = `${key}*`
const init = {
  x: W.LONG,
  y: W.LONG,
} as const


/**
 * POINT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-point
 */
export function POINT_Factory(): KoffiTypeResult {
  return genSimpleStruct(init, key, ptr)
}

/**
 * POINT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-point
 */
export interface POINT_Type {
  x: M.LONG
  y: M.LONG
}

export const LPPOINT = ptr
export const POINT_Init = init

