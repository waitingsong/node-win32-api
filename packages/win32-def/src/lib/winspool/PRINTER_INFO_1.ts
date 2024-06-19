import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


const key = 'PRINTER_INFO_1'
const ptr = `${key} *`
const init = {
  Flags: D.DWORD,
  pDescription: D.LPTSTR,
  pName: D.LPTSTR,
  pComment: D.LPTSTR,
} as const

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
  pDescription: T.LPTSTR
  pName: T.LPTSTR
  pComment: T.LPTSTR
}

export const PPRINTER_INFO_1 = ptr
export const PRINTER_INFO_1_Init = init

