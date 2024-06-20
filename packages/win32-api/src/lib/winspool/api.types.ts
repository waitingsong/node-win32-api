import * as T from 'win32-def'
import * as S from 'win32-def/struct'


export interface Win32Fns {

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/closeprinter
   */
  ClosePrinter: (hPrinter: T.HANDLE) => T.BOOL

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enddocprinter
   */
  EndDocPrinter: (hPrinter: T.HANDLE) => T.BOOL

  EndPagePrinter: (hPrinter: T.HANDLE) => T.BOOL

  /**
   * Enumerates available printers, print servers, domains, or print providers.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprinters
   */
  EnumPrintersW: (
    Flags: T.DWORD,
    Name: T.LPTSTR,
    Level: T.DWORD,
    pPrinterEnum: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => T.BOOL

  /**
   * Enumerates the print processors installed on the specified server.
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessors
   */
  EnumPrintProcessorsW: (
    pName: T.LPTSTR,
    pEnvironment: T.LPTSTR,
    Level: T.DWORD,
    pPrintProcessorInfo: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => T.BOOL

  /**
   * Enumerates the data types that a specified print processor supports.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessordatatypes
   */
  EnumPrintProcessorDatatypesW: (
    pName: T.LPTSTR,
    pPrintProcessorName: T.LPTSTR,
    Level: T.DWORD,
    pDatatypes: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter */
  GetDefaultPrinterW: (
    pszBuffer: T.LPTSTR,
    pcchBuffer: T.LPDWORD,
  ) => T.BOOL

  /**
   * Retrieves information about a specified print job
   * @param pJob JOB_INFO_1 or a JOB_INFO_2
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/getjob
   */
  GetJobW: (
    Handler: T.HANDLE,
    JobId: T.DWORD,
    Level: T.DWORD,
    // @TODO: JOB_INFO_2
    pJob: S.JOB_INFO_1_Type | T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
  ) => T.BOOL

  /**
   * Retrieves information about a specified printer.
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/getprinter
   * @docs https://learn.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
   */
  GetPrinterW: (
    hPrinter: T.HANDLE,
    Level: T.DWORD,
    // @TODO 1-9
    pPrinter: T.LPBYTE | S.PRINTER_INFO_X_Type<1 | 4 | 5>,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
  ) => T.BOOL


  /**
   * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
   * @link https://leran.microsoft.com/en-us/windows/win32/printdocs/openprinter
   * @link https://leran.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
   */
  OpenPrinterW: (
    pPrinterName: T.LPTSTR | null,
    phPrinter: T.LPHANDLE,
    pDefault: S.PRINTER_DEFAULTS_Type,
  ) => T.BOOL


  /**
   * Notifies the print spooler that a document is to be spooled for printing.
   * @param pDocInfo A pointer to a DOC_INFO_1 structure that describes the document to print.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/startdocprinter
   */
  StartDocPrinterW: (
    hPrinter: T.HANDLE,
    Level: T.DWORD,
    pDocInfo: S.DOC_INFO_1_Type,
  ) => T.DWORD

  /**
   * Notifies the spooler that a page is about to be printed on the specified printer.
   * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/startpageprinter
   */
  StartPagePrinter: (hPrinter: T.HANDLE) => T.BOOL

  /**
   * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/writeprinter
   */
  WritePrinter: (
    hPrinter: T.HANDLE,
    pBuf: T.LPVOID,
    cbBuf: T.DWORD,
    pcWritten: T.LPDWORD,
  ) => T.BOOL

}
