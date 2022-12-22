/* eslint-disable id-length */
import * as M from 'win32-def'
import * as W from 'win32-def/common.def'


export interface Win32Fns {

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/closeprinter
   */
  ClosePrinter: (hPrinter: M.HANDLE) => M.BOOL

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enddocprinter
   */
  EndDocPrinter: (hPrinter: M.HANDLE) => M.BOOL

  EndPagePrinter: (hPrinter: M.HANDLE) => M.BOOL

  /**
   * Enumerates available printers, print servers, domains, or print providers.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enumprinters
   */
  EnumPrintersW: (
    Flags: M.DWORD,
    Name: M.LPTSTR,
    Level: M.DWORD,
    pPrinterEnum: M.LPBYTE,
    cbBuf: M.DWORD,
    pcbNeeded: M.LPDWORD,
    pcReturned: M.LPDWORD,
  ) => M.BOOL

  /**
   * Enumerates the print processors installed on the specified server.
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/enumprintprocessors
   */
  EnumPrintProcessorsW: (
    pName: M.LPTSTR,
    pEnvironment: M.LPTSTR,
    Level: M.DWORD,
    pPrintProcessorInfo: M.LPBYTE,
    cbBuf: M.DWORD,
    pcbNeeded: M.LPDWORD,
    pcReturned: M.LPDWORD,
  ) => M.BOOL

  /**
   * Enumerates the data types that a specified print processor supports.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enumprintprocessordatatypes
   */
  EnumPrintProcessorDatatypesW: (
    pName: M.LPTSTR,
    pPrintProcessorName: M.LPTSTR,
    Level: M.DWORD,
    pDatatypes: M.LPBYTE,
    cbBuf: M.DWORD,
    pcbNeeded: M.LPDWORD,
    pcReturned: M.LPDWORD,
  ) => M.BOOL

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter
   */
  GetDefaultPrinterW: (
    pszBuffer: M.LPTSTR,
    pcchBuffer: M.LPDWORD,
  ) => M.BOOL

  /**
   * Retrieves information about a specified print job
   * @docs https://learn.microsoft.com/en-us/windows/win32/printdocs/getjob
   */
  GetJobW: (
    Handler: M.HANDLE,
    JobId: M.DWORD,
    Level: M.DWORD,
    pJob: M.LPBYTE,
    cbBuf: M.DWORD,
    pcbNeeded: M.LPDWORD,
  ) => M.BOOL

  /**
   * Retrieves information about a specified printer.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getprinter
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
   */
  GetPrinterW: (
    hPrinter: M.HANDLE,
    Level: M.DWORD,
    pPrinter: M.LPBYTE,
    cbBuf: M.DWORD,
    pcbNeeded: M.LPDWORD,
  ) => M.BOOL


  /**
   * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/openprinter
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
   */
  OpenPrinterW: (
    pPrinterName: M.LPTSTR,
    phPrinter: M.LPHANDLE,
    pDefault: M.LPPRINTER_DEFAULTS,
  ) => M.BOOL


  /**
   * Notifies the print spooler that a document is to be spooled for printing.
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/startdocprinter
   */
  StartDocPrinterW: (
    hPrinter: M.HANDLE,
    Level: M.DWORD,
    pDocInfo: M.LPBYTE,
  ) => M.DWORD

  /**
   * Notifies the spooler that a page is about to be printed on the specified printer.
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/startpageprinter
   */
  StartPagePrinter: (hPrinter: M.HANDLE) => M.BOOL

  /**
   *
   * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/writeprinter
   */
  WritePrinter: (
    hPrinter: M.HANDLE,
    pBuf: M.LPVOID,
    cbBuf: M.DWORD,
    pcWritten: M.LPDWORD,
  ) => M.BOOL


}


export const apiDef: M.DllFuncs<Win32Fns> = {

  ClosePrinter: [W.BOOL, [W.HANDLE] ],

  EndDocPrinter: [W.BOOL, [W.HANDLE] ],

  EndPagePrinter: [W.BOOL, [W.HANDLE] ],

  EnumPrintersW: [W.BOOL, [W.DWORD, W.LPTSTR, W.DWORD, W.LPBYTE, W.DWORD, W.LPDWORD, W.LPDWORD] ],

  EnumPrintProcessorsW: [W.BOOL, [W.LPTSTR, W.LPTSTR, W.DWORD, W.LPBYTE, W.DWORD, W.LPDWORD, W.LPDWORD] ],

  EnumPrintProcessorDatatypesW: [W.BOOL, [W.LPTSTR, W.LPTSTR, W.DWORD, W.LPBYTE, W.DWORD, W.LPDWORD, W.LPDWORD] ],

  GetDefaultPrinterW: [W.BOOL, [W.LPTSTR, W.LPDWORD] ],

  GetJobW: [W.BOOL, [W.HANDLE, W.DWORD, W.DWORD, W.LPBYTE, W.DWORD, W.LPDWORD] ],

  GetPrinterW: [W.BOOL, [W.HANDLE, W.DWORD, W.LPBYTE, W.DWORD, W.LPDWORD] ],

  OpenPrinterW: [W.BOOL, [W.LPTSTR, W.LPHANDLE, W.LPRINTER_DEFAULTS] ],

  StartDocPrinterW: [W.DWORD, [W.HANDLE, W.DWORD, W.LPBYTE] ],

  StartPagePrinter: [W.BOOL, [W.HANDLE] ],

  WritePrinter: [W.BOOL, [W.HANDLE, W.LPVOID, W.DWORD, W.LPDWORD] ],

}

