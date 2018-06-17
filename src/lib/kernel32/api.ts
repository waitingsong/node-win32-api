import { DModel as DM, DTypes as DT, FModel } from 'win32-def'


export interface Win32Fns {
    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms679351(v=vs.85).aspx
    // dwLanguageId: https://msdn.microsoft.com/en-us/library/windows/desktop/dd318693(v=vs.85).aspx
  FormatMessageW(
        dwFlags: DM.DWORD,
        lpSource: DM.LPCVOID | null,
        dwMessageId: DM.DWORD,
        dwLanguageId: DM.DWORD,     // 0x0409: US, 0x0000: Neutral locale language
        lpBuffer: DM.LPTSTR,
        nSize: DM.DWORD,
        Arguments: DM.va_list | null,
    ): DM.DWORD

  GetLastError(): DM.DWORD

  GetModuleHandleW(lpModuleName: DM.LPCTSTR | null): DM.HMODULE

  GetModuleHandleExW(dwFlags: DM.DWORD, lpModuleName: DM.LPCTSTR | null, phModule: DM.HMODULE): DM.BOOL

  GetProcessHeaps(NumberOfHeaps: DM.DWORD, ProcessHeaps: DM.PHANDLE): DM.DWORD

  HeapFree(hHeap: DM.HANDLE, dwFlags: DM.DWORD, lpMem: DM.LPVOID | null): DM.BOOL

  OpenProcess(dwDesiredAccess: DM.DWORD, bInheritHandle: DM.BOOL, dwProcessId: DM.DWORD): DM.HANDLE

    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381(v=vs.85).aspx
  SetLastError(dwErrCode: DM.DWORD): DM.VOID
}

export const apiDef: FModel.DllFuncs = {
  FormatMessageW: [
    DT.DWORD,
    [DT.DWORD, DT.LPCVOID, DT.DWORD, DT.DWORD, DT.LPTSTR, DT.DWORD, DT.va_list],
  ],

  // err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx
  GetLastError: [DT.DWORD, [] ],

  // retrive value from buf by ret.ref().readUInt32()
  GetModuleHandleW: [DT.HMODULE, [DT.LPCTSTR] ],

  // flags, optional LPCTSTR name, ref hModule
  GetModuleHandleExW: [DT.BOOL, [DT.DWORD, DT.LPCTSTR, DT.HMODULE] ],

  GetProcessHeaps: [DT.DWORD, [DT.DWORD, DT.PHANDLE] ],

  HeapFree: [DT.BOOL, [DT.HANDLE, DT.DWORD, DT.LPVOID] ],

  OpenProcess: [DT.HANDLE, [DT.DWORD, DT.BOOL, DT.DWORD] ],

  SetLastError: [DT.VOID, [DT.DWORD] ],
}
