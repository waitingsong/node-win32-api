import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {

  ClosePrinter: [D.BOOL, [D.HANDLE]],

  EndDocPrinter: [D.BOOL, [D.HANDLE]],

  EndPagePrinter: [D.BOOL, [D.HANDLE]],

  EnumPrintersW: [D.BOOL, [D.DWORD, D.LPTSTR, D.DWORD, D.LPBYTE, D.DWORD, D.LPDWORD, D.LPDWORD]],

  EnumPrintProcessorsW: [D.BOOL, [D.LPTSTR, D.LPTSTR, D.DWORD, D.LPBYTE, D.DWORD, D.LPDWORD, D.LPDWORD]],

  EnumPrintProcessorDatatypesW: [D.BOOL, [D.LPTSTR, D.LPTSTR, D.DWORD, D.LPBYTE, D.DWORD, D.LPDWORD, D.LPDWORD]],

  GetDefaultPrinterW: [D.BOOL, [D.LPTSTR, D.LPDWORD]],

  GetJobW: [D.BOOL, [D.HANDLE, D.DWORD, D.DWORD, D.LPBYTE, D.DWORD, D.LPDWORD]],

  GetPrinterW: [D.BOOL, [D.HANDLE, D.DWORD, D.LPBYTE, D.DWORD, D.LPDWORD]],

  OpenPrinterW: [D.BOOL, [D.LPTSTR, D.LPHANDLE, S.PPRINTER_DEFAULTS]],

  StartDocPrinterW: [D.DWORD, [D.HANDLE, D.DWORD, D.LPBYTE]],

  StartPagePrinter: [D.BOOL, [D.HANDLE]],

  WritePrinter: [D.BOOL, [D.HANDLE, D.LPVOID, D.DWORD, D.LPDWORD]],

}

