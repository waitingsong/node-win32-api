import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'RECT'
const ptr = `${key}*`
const init = {
  left: W.LONG,
  top: W.LONG,
  right: W.LONG,
  bottom: W.LONG,
} as const


/**
 * RECT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-RECT
 */
export function RECT_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * RECT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-RECT
 */
export interface RECT_Type {
  left: M.LONG
  top: M.LONG
  right: M.LONG
  bottom: M.LONG
}

export const LPRECT = ptr
export const RECT_Init = init

