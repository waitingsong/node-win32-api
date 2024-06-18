import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'
import { DEVMODEW_Factory, DEVMODEW_Type } from '../wingdi/DEVMODEW.js'


const key = 'PRINTER_DEFAULTS'
const ptr = `${key} *`
const init = {
  pDatatype: W.LPTSTR,
  pDevMode: DEVMODEW_Factory,
  DesiredAccess: W.ACCESS_MASK,
} as const

/**
 * PRINTER_DEFAULTS structure,
 * Specifies the default data type, environment, initialization data, and access rights for a printer.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/printer-defaults
 */
export function PRINTER_DEFAULTS_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
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
  pDatatype: M.LPTSTR
  /**
   * Pointer to a DEVMODE structure that identifies the default environment and initialization data for a printer.
   */
  pDevMode: DEVMODEW_Type
  DesiredAccess: M.ACCESS_MASK
}

export const PPRINTER_DEFAULTS = ptr
export const PRINTER_DEFAULTS_Init = init

