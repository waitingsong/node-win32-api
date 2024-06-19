import { DllFuncs } from 'win32-def'
import * as W from 'win32-def/def'
import { Win32Fns } from './api.types.js'


export const apiDef: DllFuncs<Win32Fns> = {

  EndDocPrinter: [W.BOOL, [W.HANDLE] ],

  EndPagePrinter: [W.BOOL, [W.HANDLE] ],

  WritePrinter: [W.BOOL, [W.HANDLE, W.LPVOID, W.DWORD, W.LPDWORD] ],

}

