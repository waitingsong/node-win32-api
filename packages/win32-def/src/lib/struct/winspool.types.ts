import {
  _POINTER,
  StructInstanceBase,
  ACCESS_MASK,
  DWORD,
  WCHAR_String,
  LPTSTR,
} from '../common.types.js'

import { DEVMODEW } from './wingdi.types.js'



/**
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/datatypes-info-1
 */
export interface DATATYPES_INFO_1 extends StructInstanceBase {
  pName: WCHAR_String
}
export type PDATATYPES_INFO_1 = _POINTER

/**
 * Describes a document that will be printed.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export interface DOC_INFO_1 extends StructInstanceBase {
  pDocName: LPTSTR
  pOutputFile: LPTSTR
  pDatatype: LPTSTR
}
export type PDOC_INFO_1 = _POINTER

/**
 * Specifies the name of an installed print processor.
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/printprocessor-info-1
 */
export interface PRINTPROCESSOR_INFO_1 extends StructInstanceBase {
  pName: WCHAR_String
}
export type PPRINTPROCESSOR_INFO_1 = _POINTER


/**
 * Specifies the default data type, environment, initialization data, and access rights for a printer.
 * @link https://docs.microsoft.com/zh-cn/windows/win32/printdocs/printer-defaults
 */
export interface PRINTER_DEFAULTS extends StructInstanceBase {
  /**
   * Pointer to a null-terminated string that specifies the default data type for a printer.
   */
  pDatatype: WCHAR_String
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


/**
 * Specifies general printer information
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getprinter#parameters
 */
export interface PRINTER_INFO_X {
  1: PRINTER_INFO_1
  4: PRINTER_INFO_4
  [key: number]: StructInstanceBase
}

/**
 * Specifies general printer information
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-1
 */
export interface PRINTER_INFO_1 extends StructInstanceBase {
  Flags: DWORD
  pDescription: WCHAR_String
  pName: WCHAR_String
  pComment: WCHAR_String
  // pDescription: LPTSTR
  // pName: LPTSTR
  // pComment: LPTSTR
}
export type PPRINTER_INFO_1 = _POINTER

/**
 * Specifies general printer information
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/printer-info-4
 * @description The structure can be used to retrieve minimal printer information on a call to EnumPrinters.
 *  Such a call is a fast and easy way to retrieve the names and attributes of all locally installed printers
 *  on a system and all remote printer connections that a user has established.
 */
export interface PRINTER_INFO_4 extends StructInstanceBase {
  pPrinterName: WCHAR_String
  pServerName: WCHAR_String
  Attributes: DWORD
}
export type PPRINTER_INFO_4 = _POINTER

