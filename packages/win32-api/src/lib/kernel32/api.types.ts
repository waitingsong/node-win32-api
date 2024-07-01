/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import type { DefKernel32 } from './api.def.js'


export class Kernel32 implements T.LibDef2Type<typeof DefKernel32> {
  /**
   * https://learn.microsoft.com/zh-cn/windows/win32/api/winbase/nf-winbase-formatmessage?redirectedfrom=MSDN
   * dwLanguageId: https://msdn.microsoft.com/en-us/library/windows/desktop/dd318693(v=vs.85).aspx
   */
  FormatMessageW: (
    dwFlags: T.DWORD,
    lpSource: T.LPCVOID | null,
    dwMessageId: T.DWORD,
    dwLanguageId: T.DWORD, // 0x0409: US, 0x0000: Neutral locale language
    lpBuffer: T.LPTSTR,
    nSize: T.DWORD,
    Arguments: T.va_list | null,
  ) => T.DWORD

  FreeConsole: () => T.BOOL

  GenerateConsoleCtrlEvent: (dwCtrlEvent: T.DWORD, dwProcessGroupId: T.DWORD) => T.BOOL

  GetLastError: () => T.DWORD

  GetModuleHandleW: (lpModuleName: T.LPCTSTR | null) => T.HMODULE

  GetModuleHandleExW: (dwFlags: T.DWORD, lpModuleName: T.LPCTSTR | null, phModule: Buffer) => T.BOOL

  GetProcessHeaps: (NumberOfHeaps: T.DWORD, ProcessHeaps: T.PHANDLE) => T.DWORD

  /** https://learn.microsoft.com/en-us/windows/desktop/api/processthreadsapi/nf-processthreadsapi-getsystemtimes */
  GetSystemTimes: (lpIdleTime: S.FILETIME_Type, lpKernelTime: S.FILETIME_Type, lpUserTime: S.FILETIME_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/sysinfoapi/nf-sysinfoapi-gettickcount */
  GetTickCount: () => T.DWORD

  HeapFree: (hHeap: T.HANDLE, dwFlags: T.DWORD, lpMem: T.LPVOID | null) => T.BOOL

  OpenProcess: (dwDesiredAccess: T.DWORD, bInheritHandle: T.BOOL, dwProcessId: T.DWORD) => T.HANDLE

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/libloaderapi/nf-libloaderapi-getprocaddress */
  GetProcAddress: (hModule: T.HMODULE, lpProcName: T.WString) => T.INT_PTR

  /** https://learn.microsoft.com/en-us/windows/win32/api/libloaderapi/nf-libloaderapi-loadlibraryexw */
  LoadLibraryExW: (lpLibFileName: T.WString, hFile: T.HANDLE, dwFlags: T.DWORD) => T.HMODULE

  /** https://learn.microsoft.com/en-us/windows/win32/api/debugapi/nf-debugapi-outputdebugstringw */
  OutputDebugStringW: (lpOutputString: T.LPCTSTR) => T.VOID

  /** https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381(v=vs.85).aspx */
  SetLastError: (dwErrCode: T.DWORD) => T.VOID

  /**
   * Enables an application to inform the system that it is in use,
   * thereby preventing the system from entering sleep or turning off
   * the display while the application is running.
   *
   * @example
   * // Television recording is beginning. Enable away mode and prevent the sleep idle time-out.
   * SetThreadExecutionState(ES_CONTINUOUS | ES_SYSTEM_REQUIRED | ES_AWAYMODE_REQUIRED);
   *
   * // Clear EXECUTION_STATE flags to disable away mode and allow the system to idle to sleep normally.
   * SetThreadExecutionState(ES_CONTINUOUS);
   *
   * @param esFlags The thread's execution requirements.
   * This parameter can be one or more of the following values. Join them with single |
   * @returns If the function succeeds, the return value is the previous thread execution state.
   * If the function fails, the return value is NULL.
   * @see [Docs](https://learn.microsoft.com/en-us/windows/desktop/api/winbase/nf-winbase-setthreadexecutionstate)
   *
   */
  SetThreadExecutionState: (esFlags: T.UINT) => T.UINT
}

/* c8 ignore stop */
