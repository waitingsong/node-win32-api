import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {

  ClosePrinter: [D.BOOL, [D.HANDLE]],

  EndDocPrinter: [D.BOOL, [D.HANDLE]],

  EndPagePrinter: [D.BOOL, [D.HANDLE]],

  /**
   * Enumerates available printers, print servers, domains, or print providers.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprinters
   */
  EnumPrintersW: [D.BOOL, [D.DWORD, D.LPTSTR, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, D.LPDWORD, D.LPDWORD]],

  /**
   * Enumerates the print processors installed on the specified server.
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessors
   */
  EnumPrintProcessorsW: [D.BOOL, [D.LPTSTR, D.LPTSTR, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`, `_Out_ ${D.LPDWORD}`]],

  /**
   * Enumerates the data types that a specified print processor supports.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessordatatypes
   */
  EnumPrintProcessorDatatypesW: [D.BOOL, [D.LPTSTR, D.LPTSTR, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`, `_Out_ ${D.LPDWORD}`]],

  /** https://learn.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter */
  GetDefaultPrinterW: [D.BOOL, [D.LPTSTR, `_Inout_ ${D.LPDWORD}`]],

  /**
   * Retrieves information about a specified print job
   * https://learn.microsoft.com/en-us/windows/win32/printdocs/getjob
   * @param pJob JOB_INFO_1 or a JOB_INFO_2
   */
  GetJobW: [D.BOOL, [D.HANDLE, D.DWORD, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`]],

  /**
   * Retrieves information about a specified printer.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/getprinter
   * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
   */
  GetPrinterW: [D.BOOL, [D.HANDLE, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`]],

  /**
   * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/openprinter
   * @docs https://learn.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
   */
  OpenPrinterW: [D.BOOL, [D.LPTSTR, `_Out_ ${D.LPHANDLE}`, S.PPRINTER_DEFAULTS]],

  /**
   * Notifies the print spooler that a document is to be spooled for printing.
   * @param pDocInfo A pointer to a DOC_INFO_1 structure that describes the document to print.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/startdocprinter
   */
  StartDocPrinterW: [D.DWORD, [D.HANDLE, D.DWORD, S.LPDOC_INFO_1]],

  /**
   * Notifies the spooler that a page is about to be printed on the specified printer.
   * @docs https://learn.microsoft.com/zh-cn/windows/win32/printdocs/startpageprinter
   */
  StartPagePrinter: [D.BOOL, [D.HANDLE]],

  /**
   * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/writeprinter
   */
  WritePrinter: [D.BOOL, [D.HANDLE, D.LPVOID, D.DWORD, `_Out_ ${D.LPDWORD}`]],

}

