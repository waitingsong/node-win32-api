/* c8 ignore start */
import type * as T from 'win32-def/types'

import type { DefSpoolss } from './api.def.js'


export class Spoolss implements T.LibDef2Type<typeof DefSpoolss> {

  /** https://learn.microsoft.com/en-us/windows/win32/printdocs/enddocprinter */
  EndDocPrinter: (hPrinter: T.HANDLE) => T.BOOL

  EndPagePrinter: (hPrinter: T.HANDLE) => T.BOOL

  /** https://learn.microsoft.com/zh-cn/windows/win32/printdocs/writeprinter */
  WritePrinter: (hPrinter: T.HANDLE, pBuf: T.LPVOID, cbBuf: T.DWORD, pcWritten: T.LPDWORD,) => T.BOOL

}

/* c8 ignore stop */
