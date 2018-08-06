import { DModel as M, DTypes as W, FModel } from 'win32-def'


export interface Win32Fns {
    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms679351(v=vs.85).aspx
    // dwLanguageId: https://msdn.microsoft.com/en-us/library/windows/desktop/dd318693(v=vs.85).aspx
  FormatMessageW(
        dwFlags: M.DWORD,
        lpSource: M.LPCVOID | null,
        dwMessageId: M.DWORD,
        dwLanguageId: M.DWORD,     // 0x0409: US, 0x0000: Neutral locale language
        lpBuffer: M.LPTSTR,
        nSize: M.DWORD,
        Arguments: M.va_list | null,
    ): M.DWORD

  GetLastError(): M.DWORD

  GetModuleHandleW(lpModuleName: M.LPCTSTR | null): M.HMODULE

  GetModuleHandleExW(dwFlags: M.DWORD, lpModuleName: M.LPCTSTR | null, phModule: M.HMODULE): M.BOOL

  GetProcessHeaps(NumberOfHeaps: M.DWORD, ProcessHeaps: M.PHANDLE): M.DWORD

  HeapFree(hHeap: M.HANDLE, dwFlags: M.DWORD, lpMem: M.LPVOID | null): M.BOOL

  OpenProcess(dwDesiredAccess: M.DWORD, bInheritHandle: M.BOOL, dwProcessId: M.DWORD): M.HANDLE

    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381(v=vs.85).aspx
  SetLastError(dwErrCode: M.DWORD): M.VOID

  FreeConsole(): M.BOOL
}

export const apiDef: FModel.DllFuncs = {
  FormatMessageW: [
    W.DWORD,
    [W.DWORD, W.LPCVOID, W.DWORD, W.DWORD, W.LPTSTR, W.DWORD, W.va_list],
  ],

  // err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx
  GetLastError: [W.DWORD, [] ],

  // retrive value from buf by ret.ref().readUInt32()
  GetModuleHandleW: [W.HMODULE, [W.LPCTSTR] ],

  // flags, optional LPCTSTR name, ref hModule
  GetModuleHandleExW: [W.BOOL, [W.DWORD, W.LPCTSTR, W.HMODULE] ],

  GetProcessHeaps: [W.DWORD, [W.DWORD, W.PHANDLE] ],

  HeapFree: [W.BOOL, [W.HANDLE, W.DWORD, W.LPVOID] ],

  OpenProcess: [W.HANDLE, [W.DWORD, W.BOOL, W.DWORD] ],

  SetLastError: [W.VOID, [W.DWORD] ],

  FreeConsole: [W.BOOL, [] ],
}
