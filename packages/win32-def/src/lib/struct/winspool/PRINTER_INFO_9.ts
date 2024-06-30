import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'
import { DEVMODEW_Factory } from '../wingdi/wingdi.index.js'
import type { DEVMODEW_Type } from '../wingdi/wingdi.index.js'


const key = 'PRINTER_INFO_9'
const ptr = `${key}*` as const
const init: StructInitType = {
  pDevMode: DEVMODEW_Factory,
} as const

export const PPRINTER_INFO_9 = ptr
export const PRINTER_INFO_9_Name = key
export const PRINTER_INFO_9_Init: typeof init = init

/**
 * PRINTER_INFO_9 structure,
 * structure specifies the per-user default printer settings.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-9
 */
export function PRINTER_INFO_9_Factory(): StructFactoryResult<PRINTER_INFO_9_Type> {
  return genStruct<PRINTER_INFO_9_Type>(init, key, ptr)
}

/**
 * PRINTER_INFO_9 structure,
 * structure specifies the per-user default printer settings.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-9
 */
export interface PRINTER_INFO_9_Type {
  pDevMode: DEVMODEW_Type
}

