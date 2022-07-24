import {
  ACCESS_MASK,
  DWORD,
  LPTSTR,
} from '../common.def.js'
import { StructType } from '../helper.js'

import { DEVMODEW } from './wingdi.def.js'


/**
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/datatypes-info-1
 */
export const DATATYPES_INFO_1 = {
  pName: LPTSTR,
} as const

/**
 * Describes a document that will be printed.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export const DOC_INFO_1 = {
  pDocName: LPTSTR,
  pOutputFile: LPTSTR,
  pDatatype: LPTSTR,
} as const

/**
 * Specifies the name of an installed print processor.
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/printprocessor-info-1
 */
export const PRINTPROCESSOR_INFO_1 = {
  pName: LPTSTR,
} as const

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
} as const


/**
 * Specifies general printer information
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-1
 */
export const PRINTER_INFO_1 = {
  Flags: DWORD,
  pDescription: LPTSTR,
  pName: LPTSTR,
  pComment: LPTSTR,
} as const


/**
 * Specifies general printer information
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-4
 * @description The structure can be used to retrieve minimal printer information on a call to EnumPrinters.
 *  Such a call is a fast and easy way to retrieve the names and attributes of all locally installed printers
 *  on a system and all remote printer connections that a user has established.
 */
export const PRINTER_INFO_4 = {
  pPrinterName: LPTSTR,
  pServerName: LPTSTR,
  Attributes: DWORD,
} as const

