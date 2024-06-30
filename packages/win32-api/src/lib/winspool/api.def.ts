import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'


export class DefWinspool implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  static ClosePrinter = [D.BOOL, [D.HANDLE]]

  static EndDocPrinter = [D.BOOL, [D.HANDLE]]

  static EndPagePrinter = [D.BOOL, [D.HANDLE]]

  /**
   * Enumerates available printers, print servers, domains, or print providers.
   * using multipleChoice to accept payload `pPrinterEnum` depends on `Level`
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprinters
   */
  static EnumPrintersW = [D.BOOL,
    [
      D.DWORD,
      D.WString,
      D.DWORD,
      `_Out_ ${D.LPBYTE}`,
      D.DWORD,
      D.LPDWORD,
      D.LPDWORD,
    ]]

  /**
   * Enumerates the print processors installed on the specified server.
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessors
   */
  static EnumPrintProcessorsW = [D.BOOL, [D.LPTSTR, D.LPTSTR, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`, `_Out_ ${D.LPDWORD}`]]

  /**
   * Enumerates the data types that a specified print processor supports.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessordatatypes
   */
  static EnumPrintProcessorDatatypesW = [D.BOOL, [D.LPTSTR, D.LPTSTR, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`, `_Out_ ${D.LPDWORD}`]]

  /** https://learn.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter */
  static GetDefaultPrinterW = [D.BOOL, [D.LPTSTR, `_Inout_ ${D.LPDWORD}`]]

  /**
   * Retrieves information about a specified print job
   * https://learn.microsoft.com/en-us/windows/win32/printdocs/getjob
   * @param pJob JOB_INFO_1 or a JOB_INFO_2
   */
  static GetJobW = [D.BOOL, [D.HANDLE, D.DWORD, D.DWORD, `_Out_ ${D.LPBYTE}`, D.DWORD, `_Out_ ${D.LPDWORD}`]]

  /**
   * Retrieves information about a specified printer.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/getprinter
   * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
   */
  static GetPrinterW = [D.BOOL, [
    D.HANDLE,
    D.DWORD,
    // multiple choice instead of `_Out_ ${D.LPBYTE}`,
    // @TODO 2|7
    [
      `_Out_ ${S.PPRINTER_INFO_1}`,
      `_Out_ ${S.PPRINTER_INFO_4}`,
      `_Out_ ${S.PPRINTER_INFO_5}`,
      `_Out_ ${S.PPRINTER_INFO_6}`,
      `_Out_ ${S.PPRINTER_INFO_8}`,
      `_Out_ ${S.PPRINTER_INFO_9}`,
    ],
    D.DWORD,
    `_Out_ ${D.LPDWORD}`,
  ]] as const // `as const` is required for multipleChoice

  /**
   * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/openprinter
   * @docs https://learn.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
   */
  static OpenPrinterW = [D.BOOL, [D.WString, `_Out_ ${D.LPHANDLE}`, S.PPRINTER_DEFAULTS]]

  /**
   * Notifies the print spooler that a document is to be spooled for printing.
   * @param pDocInfo A pointer to a DOC_INFO_1 structure that describes the document to print.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/startdocprinter
   */
  static StartDocPrinterW = [D.DWORD, [D.HANDLE, D.DWORD, S.LPDOC_INFO_1]]

  /**
   * Notifies the spooler that a page is about to be printed on the specified printer.
   * @docs https://learn.microsoft.com/zh-cn/windows/win32/printdocs/startpageprinter
   */
  static StartPagePrinter = [D.BOOL, [D.HANDLE]]

  /**
   * Notifies the print spooler that data should be written to the specified printer.
   * @note Only supports GDI printing and must not be used for XPS printing
   * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/writeprinter
   */
  static WritePrinter = [D.BOOL, [D.HANDLE, D.LPVOID, D.DWORD, `_Out_ ${D.LPDWORD}`]]

}

