import * as T from 'win32-def'


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
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enumprinters
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
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/enumprintprocessors
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
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessordatatypes
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

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter
   */
  GetDefaultPrinterW: (
    pszBuffer: T.LPTSTR,
    pcchBuffer: T.LPDWORD,
  ) => T.BOOL

  /**
   * Retrieves information about a specified print job
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/getjob
   */
  GetJobW: (
    Handler: T.HANDLE,
    JobId: T.DWORD,
    Level: T.DWORD,
    pJob: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
  ) => T.BOOL

  /**
   * Retrieves information about a specified printer.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getprinter
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
   */
  GetPrinterW: (
    hPrinter: T.HANDLE,
    Level: T.DWORD,
    pPrinter: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
  ) => T.BOOL


  /**
   * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/openprinter
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
   */
  OpenPrinterW: (
    pPrinterName: T.LPTSTR,
    phPrinter: T.LPHANDLE,
    pDefault: T.LPPRINTER_DEFAULTS,
  ) => T.BOOL


  /**
   * Notifies the print spooler that a document is to be spooled for printing.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/startdocprinter
   */
  StartDocPrinterW: (
    hPrinter: T.HANDLE,
    Level: T.DWORD,
    pDocInfo: T.LPBYTE,
  ) => T.DWORD

  /**
   * Notifies the spooler that a page is about to be printed on the specified printer.
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/startpageprinter
   */
  StartPagePrinter: (hPrinter: T.HANDLE) => T.BOOL

  /**
   *
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/writeprinter
   */
  WritePrinter: (
    hPrinter: T.HANDLE,
    pBuf: T.LPVOID,
    cbBuf: T.DWORD,
    pcWritten: T.LPDWORD,
  ) => T.BOOL


}
