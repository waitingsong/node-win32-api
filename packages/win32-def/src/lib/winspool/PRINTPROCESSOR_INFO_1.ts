import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'PRINTPROCESSOR_INFO_1'
const ptr = `${key}*`
const init = {
  pName: W.LPTSTR,
} as const

/**
 * PRINTPROCESSOR_INFO_1 structure
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printprocessor-info-1
 */
export function PRINTPROCESSOR_INFO_1_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * PRINTPROCESSOR_INFO_1 structure
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printprocessor-info-1
 */
export interface PRINTPROCESSOR_INFO_1_Type {
  pName: M.LPTSTR
}

export const PPRINTPROCESSOR_INFO_1 = ptr
export const PRINTPROCESSOR_INFO_1_Init = init

