import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'PRINTPROCESSOR_INFO_1'
const ptr = `${key}*` as const
const init: StructInitType = {
  pName: D.LPTSTR,
} as const

export const PPRINTPROCESSOR_INFO_1 = ptr
export const PRINTPROCESSOR_INFO_1_Name = key
export const PRINTPROCESSOR_INFO_1_Init: typeof init = init

/**
 * PRINTPROCESSOR_INFO_1 structure,
 * Specifies the name of an installed print processor.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printprocessor-info-1
 */
export function PRINTPROCESSOR_INFO_1_Factory(): StructFactoryResult<PRINTPROCESSOR_INFO_1_Type> {
  return genStruct<PRINTPROCESSOR_INFO_1_Type>(init, key, ptr)
}

/**
 * PRINTPROCESSOR_INFO_1 structure,
 * Specifies the name of an installed print processor.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printprocessor-info-1
 */
export interface PRINTPROCESSOR_INFO_1_Type {
  pName: T.LPTSTR
}

