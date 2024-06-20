import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'

import { DEVMODEW_Factory, DEVMODEW_Type } from '../wingdi/DEVMODEW.js'


const key = 'PRINTER_DEFAULTS'
const ptr = `${key} *`
const init = {
  pDatatype: D.LPTSTR,
  pDevMode: DEVMODEW_Factory,
  DesiredAccess: D.ACCESS_MASK,
} as const

/**
 * PRINTER_DEFAULTS structure,
 * Specifies the default data type, environment, initialization data, and access rights for a printer.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printer-defaults
 */
export function PRINTER_DEFAULTS_Factory(): StructFactoryResult<PRINTER_DEFAULTS_Type> {
  return genStruct<PRINTER_DEFAULTS_Type>(init, key, ptr)
}

/**
 * PRINTER_DEFAULTS structure,
 * Specifies the default data type, environment, initialization data, and access rights for a printer.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printer-defaults
 */
export interface PRINTER_DEFAULTS_Type {
  /**
   * Pointer to a null-terminated string that specifies the default data type for a printer.
   */
  pDatatype: T.LPTSTR
  /**
   * Pointer to a DEVMODE structure that identifies the default environment and initialization data for a printer.
   */
  pDevMode: DEVMODEW_Type
  DesiredAccess: T.ACCESS_MASK
}

export const PPRINTER_DEFAULTS = ptr
export const PRINTER_DEFAULTS_Init = init

