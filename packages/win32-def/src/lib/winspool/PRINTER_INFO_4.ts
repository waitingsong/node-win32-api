import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'PRINTER_INFO_4'
const ptr = `${key} *`
const init = {
  pPrinterName: W.LPTSTR,
  pServerName: W.LPTSTR,
  Attributes: W.DWORD,
} as const

/**
 * PRINTER_INFO_4 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-4
 * @description The structure can be used to retrieve minimal printer information on a call to EnumPrinters.
 *  Such a call is a fast and easy way to retrieve the names and attributes of all locally installed printers
 *  on a system and all remote printer connections that a user has established.
 */
export function PRINTER_INFO_4_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
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
  pPrinterName: M.LPTSTR
  pServerName: M.LPTSTR
  Attributes: M.DWORD
}

export const PPRINTER_INFO_4 = ptr
export const PRINTER_INFO_4_Init = init

