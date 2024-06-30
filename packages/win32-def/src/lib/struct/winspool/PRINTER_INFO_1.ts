import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'PRINTER_INFO_1'
const ptr = `${key}*` as const
const init: StructInitType = {
  Flags: D.DWORD,
  pDescription: D.WString,
  pName: D.WString,
  pComment: D.WString,
} as const

export const PPRINTER_INFO_1 = ptr
export const PRINTER_INFO_1_Name = key
export const PRINTER_INFO_1_Init: typeof init = init

/**
 * PRINTER_INFO_1 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-1
 */
export function PRINTER_INFO_1_Factory(): StructFactoryResult<PRINTER_INFO_1_Type> {
  return genStruct<PRINTER_INFO_1_Type>(init, key, ptr)
}

/**
 * PRINTER_INFO_1 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-1
 */
export interface PRINTER_INFO_1_Type {
  Flags: T.DWORD
  pDescription: T.WString
  pName: T.WString
  pComment: T.WString
}

