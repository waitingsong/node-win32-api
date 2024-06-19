import * as T from 'win32-def'


export interface Win32Fns {

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enddocprinter
   */
  EndDocPrinter: (hPrinter: T.HANDLE) => T.BOOL

  EndPagePrinter: (hPrinter: T.HANDLE) => T.BOOL

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
