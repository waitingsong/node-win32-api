/* eslint-disable id-length */
import * as M from 'win32-def'
import * as W from 'win32-def/common.def'


export interface Win32Fns {

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enddocprinter
   */
  EndDocPrinter: (hPrinter: M.HANDLE) => M.BOOL

  EndPagePrinter: (hPrinter: M.HANDLE) => M.BOOL

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

  EndDocPrinter: [W.BOOL, [W.HANDLE] ],

  EndPagePrinter: [W.BOOL, [W.HANDLE] ],

  WritePrinter: [W.BOOL, [W.HANDLE, W.LPVOID, W.DWORD, W.LPDWORD] ],

}

