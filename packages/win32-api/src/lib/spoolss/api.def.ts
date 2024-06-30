import * as D from 'win32-def/def'
import type * as T from 'win32-def/types'


export class DefSpoolss implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  static EndDocPrinter = [D.BOOL, [D.HANDLE]]

  static EndPagePrinter = [D.BOOL, [D.HANDLE]]

  /** https://learn.microsoft.com/en-us/windows/win32/printdocs/writeprinter */
  static WritePrinter = [D.BOOL, [D.HANDLE, D.LPVOID, D.DWORD, `_Out_ ${D.LPDWORD}`]]

}

