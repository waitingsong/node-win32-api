import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'PRINTER_INFO_4'
const ptr = `${key}*` as const
const init: StructInitType = {
  pPrinterName: D.WString,
  pServerName: D.WString,
  Attributes: D.DWORD,
} as const

export const PPRINTER_INFO_4 = ptr
export const PRINTER_INFO_4_Name = key
export const PRINTER_INFO_4_Init: typeof init = init

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
  pPrinterName: T.WString
  pServerName: T.WString | null
  Attributes: T.DWORD
}

