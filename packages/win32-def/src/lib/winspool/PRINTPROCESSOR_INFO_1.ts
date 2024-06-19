import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


const key = 'PRINTPROCESSOR_INFO_1'
const ptr = `${key} *`
const init = {
  pName: D.LPTSTR,
} as const

/**
 * PRINTPROCESSOR_INFO_1 structure,
 * Specifies the name of an installed print processor.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printprocessor-info-1
 */
export function PRINTPROCESSOR_INFO_1_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * PRINTPROCESSOR_INFO_1 structure,
 * Specifies the name of an installed print processor.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printprocessor-info-1
 */
export interface PRINTPROCESSOR_INFO_1_Type {
  pName: T.LPTSTR
}

export const PPRINTPROCESSOR_INFO_1 = ptr
export const PRINTPROCESSOR_INFO_1_Init = init

