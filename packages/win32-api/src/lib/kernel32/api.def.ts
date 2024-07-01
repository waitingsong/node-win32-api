import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'


export class DefKernel32 implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  static FormatMessageW = [
    D.DWORD,
    [D.DWORD, D.LPCVOID, D.DWORD, D.DWORD, `_Out_ ${D.LPTSTR}`, D.DWORD, D.va_list],
  ]

  static FreeConsole = [D.BOOL, []]
  static GenerateConsoleCtrlEvent = [D.BOOL, [D.DWORD, D.DWORD]]

  /** err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx */
  static GetLastError = [D.DWORD, []]

  /** retrieve value from buf by readUInt32() */
  static GetModuleHandleW = [D.HMODULE, [D.WString]]

  /** flags, optional LPCTSTR name, ref hModule */
  static GetModuleHandleExW = [D.BOOL, [D.DWORD, D.WString, `_Out_ ${D.HMODULE}*`]]

  static GetProcessHeaps = [D.DWORD, [D.DWORD, D.PHANDLE]]

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/libloaderapi/nf-libloaderapi-getprocaddress */
  static GetProcAddress = ['intptr_t', [D.HMODULE, D.WString]] // FARPROC

  static GetSystemTimes = [D.BOOL, [`_Out_ ${S.LPFILETIME}`, `_Out_ ${S.LPFILETIME}`, `_Out_ ${S.LPFILETIME}`]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-gettickcount */
  static GetTickCount = [D.DWORD, []]

  static HeapFree = [D.BOOL, [D.HANDLE, D.DWORD, D.LPVOID]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibraryexw */
  static LoadLibraryExW = [D.HMODULE, [D.WString, D.HANDLE, D.DWORD]]

  static OpenProcess = [D.HANDLE, [D.DWORD, D.BOOL, D.DWORD]]

  static OutputDebugStringW = [D.VOID, [D.LPCTSTR]]

  static SetLastError = [D.VOID, [D.DWORD]]

  static SetThreadExecutionState = [D.INT, [D.INT]]
}
