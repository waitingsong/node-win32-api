import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {
  FormatMessageW: [
    D.DWORD,
    [D.DWORD, D.LPCVOID, D.DWORD, D.DWORD, `_Out_ ${D.LPTSTR}`, D.DWORD, D.va_list],
  ],

  FreeConsole: [D.BOOL, []],

  GenerateConsoleCtrlEvent: [D.BOOL, [D.DWORD, D.DWORD]],

  /** err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx */
  GetLastError: [D.DWORD, []],

  /** retrieve value from buf by readUInt32() */
  GetModuleHandleW: [D.HMODULE, [D.LPCTSTR]],

  /** flags, optional LPCTSTR name, ref hModule */
  GetModuleHandleExW: [D.BOOL, [D.DWORD, D.LPCTSTR, D.HMODULE]],

  GetProcessHeaps: [D.DWORD, [D.DWORD, D.PHANDLE]],

  GetSystemTimes: [D.BOOL, [`_Out_ ${D.PFILETIME}`, `_Out_ ${D.PFILETIME}`, `_Out_ ${D.PFILETIME}`]],

  HeapFree: [D.BOOL, [D.HANDLE, D.DWORD, D.LPVOID]],

  OpenProcess: [D.HANDLE, [D.DWORD, D.BOOL, D.DWORD]],

  OutputDebugStringW: [D.VOID, [D.LPCTSTR]],

  SetLastError: [D.VOID, [D.DWORD]],

  SetThreadExecutionState: [D.INT, [D.INT]],
}
