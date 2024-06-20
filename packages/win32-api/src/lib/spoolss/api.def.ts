import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {

  EndDocPrinter: [D.BOOL, [D.HANDLE]],

  EndPagePrinter: [D.BOOL, [D.HANDLE]],

  WritePrinter: [D.BOOL, [D.HANDLE, D.LPVOID, D.DWORD, D.LPDWORD]],

}

