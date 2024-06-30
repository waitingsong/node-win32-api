import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'
import { DEVMODEW_Factory } from '../wingdi/wingdi.index.js'
import type { DEVMODEW_Type } from '../wingdi/wingdi.index.js'


const key = 'PRINTER_INFO_8'
const ptr = `${key}*` as const
const init: StructInitType = {
  pDevMode: DEVMODEW_Factory,
} as const

export const PPRINTER_INFO_8 = ptr
export const PRINTER_INFO_8_Name = key
export const PRINTER_INFO_8_Init: typeof init = init

/**
 * PRINTER_INFO_8 structure,
 * specifies the global default printer settings.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-8
 */
export function PRINTER_INFO_8_Factory(): StructFactoryResult<PRINTER_INFO_8_Type> {
  return genStruct<PRINTER_INFO_8_Type>(init, key, ptr)
}

/**
 * PRINTER_INFO_8 structure,
 * specifies the global default printer settings.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-8
 */
export interface PRINTER_INFO_8_Type {
  pDevMode: DEVMODEW_Type
}

