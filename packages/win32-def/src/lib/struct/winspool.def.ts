import {
  ACCESS_MASK,
  LPTSTR,
} from '../common.def.js'
// import { wcharBuffer } from '../fixed-buffer.js'
import { StructType } from '../helper.js'

import { DEVMODEW } from './wingdi.def.js'


/**
 * Specifies the default data type, environment, initialization data, and access rights for a printer.
 * @link https://docs.microsoft.com/zh-cn/windows/win32/printdocs/printer-defaults
 */
export const PRINTER_DEFAULTS = {
  /**
   * Pointer to a null-terminated string that specifies the default data type for a printer.
   */
  pDatatype: LPTSTR,
  /**
   * Pointer to a DEVMODE structure that identifies the default environment and initialization data for a printer.
   */
  pDevMode: StructType(DEVMODEW),
  // pDevMode: LPDEVMODE,
  DesiredAccess: ACCESS_MASK,
}

