import * as W from '../windef';
import * as GT from '../types';


export const fnDef: GT.Win32FnDef = {
    FormatMessageW: [W.DWORD, [W.DWORD, W.LPCVOID, W.DWORD, W.DWORD, W.LPTSTR, W.DWORD, W.va_list]],

    GetLastError: [W.DWORD, []], // err code: https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms681381(v=vs.85).aspx

    GetModuleHandleW: [W.HMODULE, [W.LPCTSTR]],    // retrive value from buf by ret.ref().readUInt32()

    GetModuleHandleExW: [W.BOOL, [W.DWORD, W.LPCTSTR, W.HMODULE]],     // flags, optional LPCTSTR name, ref hModule

    GetProcessHeaps: [W.DWORD, [W.DWORD, W.PHANDLE]],

    HeapFree: [W.BOOL, [W.HANDLE, W.DWORD, W.LPVOID]],
};

export interface Win32Fn {
    // https://msdn.microsoft.com/en-us/library/windows/desktop/ms679351(v=vs.85).aspx
    // dwLanguageId: https://msdn.microsoft.com/en-us/library/windows/desktop/dd318693(v=vs.85).aspx
    FormatMessageW(
        dwFlags: GT.DWORD,
        lpSource: GT.LPCVOID | null,
        dwMessageId: GT.DWORD,
        dwLanguageId: GT.DWORD,     // 0x0409: US, 0x0000: Neutral locale language
        lpBuffer: GT.LPTSTR,
        nSize: GT.DWORD,
        Arguments: GT.va_list | null
    ): GT.DWORD;

    GetLastError(): GT.DWORD;

    GetModuleHandleW(lpModuleName: GT.LPCTSTR | null): GT.HMODULE;

    GetModuleHandleExW(dwFlags: GT.DWORD, lpModuleName: GT.LPCTSTR | null, phModule: GT.HMODULE): GT.BOOL;

    GetProcessHeaps(NumberOfHeaps: GT.DWORD, ProcessHeaps: GT.PHANDLE): GT.DWORD;

    HeapFree( hHeap: GT.HANDLE, dwFlags: GT.DWORD, lpMem: GT.LPVOID | null): GT.BOOL;
}
