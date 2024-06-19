import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


const key = 'PRINTER_INFO_4'
const ptr = `${key} *`
const init = {
  pPrinterName: D.LPTSTR,
  pServerName: D.LPTSTR,
  Attributes: D.DWORD,
} as const

/**
 * PRINTER_INFO_4 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-4
 * @description The structure can be used to retrieve minimal printer information on a call to EnumPrinters.
 *  Such a call is a fast and easy way to retrieve the names and attributes of all locally installed printers
 *  on a system and all remote printer connections that a user has established.
 */
export function PRINTER_INFO_4_Factory(): StructFactoryResult<PRINTER_INFO_4_Type> {
  return genStruct<PRINTER_INFO_4_Type>(init, key, ptr)
}

/**
 * PRINTER_INFO_4 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-4
 * @description The structure can be used to retrieve minimal printer information on a call to EnumPrinters.
 *  Such a call is a fast and easy way to retrieve the names and attributes of all locally installed printers
 *  on a system and all remote printer connections that a user has established.
 */
export interface PRINTER_INFO_4_Type {
  pPrinterName: T.LPTSTR
  pServerName: T.LPTSTR
  Attributes: T.DWORD
}

export const PPRINTER_INFO_4 = ptr
export const PRINTER_INFO_4_Init = init

