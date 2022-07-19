import {
  _POINTER,
  StructInstanceBase,
  LPTSTR,
  ACCESS_MASK,
} from '../common.types.js'

import { DEVMODEW } from './wingdi.types.js'


/**
 * Specifies the default data type, environment, initialization data, and access rights for a printer.
 * @link https://docs.microsoft.com/zh-cn/windows/win32/printdocs/printer-defaults
 */
export interface PRINTER_DEFAULTS extends StructInstanceBase {
  /**
   * Pointer to a null-terminated string that specifies the default data type for a printer.
   */
  pDatatype: LPTSTR
  /**
   * Pointer to a DEVMODE structure that identifies the default environment and initialization data for a printer.
   */
  // pDevMode: LPDEVMODEW
  pDevMode: DEVMODEW
  DesiredAccess: ACCESS_MASK
}
/** A pointer to PRINTER_DEFAULTS */
export type PPRINTER_DEFAULTS = _POINTER
export type LPPRINTER_DEFAULTS = _POINTER

