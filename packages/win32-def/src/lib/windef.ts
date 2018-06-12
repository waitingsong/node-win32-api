// windows data types for ref module https://github.com/TooTallNate/ref
// https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751

import {
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from './config'
/**
 * macro convert method
 * _WIN64_HOLDER or _UNICODE_HOLDER
 *
 * demo: const PVOID = _WIN64_HOLDER;
 */

export const ATOM = 'uint16'
export const DWORD = 'uint32'
export const PVOID = _WIN64_HOLDER
export const HANDLE = 'PVOID'
export const LONG_PTR = _WIN64_HOLDER
export const ULONG_PTR = _WIN64_HOLDER
export const VOID = 'void'
export const WCHAR = 'uint16'
export const WORD = 'int16'

export const BOOL = 'int'
export const BOOLEAN = 'bool'
export const BYTE = 'byte'
export const CALLBACK = 'pointer'  // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
export const CCHAR = 'char'
export const CHAR = 'char'
export const COLORREF = 'DWORD'
// export const CONST;
export const DWORDLONG = 'uint64'
export const DWORD_PTR = 'ULONG_PTR'
export const DWORD32 = 'uint32'
export const DWORD64 = 'uint64'
export const FLOAT = 'float'
export const HACCEL = 'HANDLE'
export const HALF_PTR = _WIN64_HOLDER
export const HBITMAP = 'HANDLE'
export const HBRUSH = 'HANDLE'
export const HCOLORSPACE = 'HANDLE'
export const HCONV = 'HANDLE'
export const HCONVLIST = 'HANDLE'
export const HCURSOR = 'HANDLE'
export const HDC = 'HANDLE'
export const HDDEDATA = 'HANDLE'
export const HDESK = 'HANDLE'
export const HDROP = 'HANDLE'
export const HDWP = 'HANDLE'
export const HENHMETAFILE = 'HANDLE'
export const HFILE = 'HANDLE'    // typedef int HFILE;
export const HFONT = 'HANDLE'
export const HGDIOBJ = 'HANDLE'
export const HGLOBAL = 'HANDLE'
export const HHOOK = 'HANDLE'
export const HICON = 'HANDLE'
export const HINSTANCE = 'HANDLE'
export const HKEY = 'HANDLE'
export const HKL = 'HANDLE'
export const HLOCAL = 'HANDLE'
export const HMENU = 'HANDLE'
export const HMETAFILE = 'HANDLE'
export const HMODULE = HINSTANCE
export const HMONITOR = 'HANDLE'
export const HPALETTE = 'HANDLE'
export const HPEN = 'HANDLE'
export const HRESULT = 'long'
export const HRGN = 'HANDLE'
export const HRSRC = 'HANDLE'
export const HSZ = 'HANDLE'
export const HWINEVENTHOOK = 'HANDLE'
export const HWINSTA = 'HANDLE'
export const HWND = 'HANDLE'
export const INT = 'int'
export const INT_PTR = _WIN64_HOLDER
export const INT8 = 'int8'
export const INT16 = 'int16'
export const INT32 = 'int32'
export const INT64 = 'int64'
export const LANGID = 'WORD'
export const LCID = 'DWORD'
export const LCTYPE = 'DWORD'
export const LGRPID = 'DWORD'
export const LONG = 'long'
export const LONGLONG = 'longlong'
export const LONG32 = 'int32'
export const LONG64 = 'int64'
export const LPARAM = 'LONG_PTR'
export const LPBOOL = 'BOOL'
export const LPBYTE = 'byte*'
export const LPCOLORREF = 'DWORD'
export const LPCSTR = 'uint8*'
export const LPCWSTR = 'uint16*'
export const LPCTSTR = _UNICODE_HOLDER
export const LPVOID = 'void*'
export const LPCVOID = 'LPVOID'
export const LPDWORD = 'uint16*'
export const LPHANDLE = _WIN64_HOLDER   // A pointer to a HANDLE.
export const LPINT = 'int*'
export const LPLONG = 'int32*'
export const LPMSG = 'pointer' // A pointer to a MSG
export const LPSTR = 'char*'
export const LPWSTR = 'uint16*'
export const LPTSTR = _UNICODE_HOLDER
export const LPWORD = 'uint16*'
export const LRESULT = 'LONG_PTR'
export const NTSTATUS = 'uint32'
export const PBOOL = 'int*'    // ? 'bool*'
export const PBOOLEAN = 'bool*'
export const PBYTE = 'byte*'
export const PCHAR = 'char*'
export const PCSTR = 'uint8*'
export const PCTSTR = _WIN64_HOLDER
export const PCWSTR = 'uint16*'
export const PDWORD = 'uint32*'
export const PDWORDLONG = 'uint64*'
export const PDWORD_PTR = 'DWORD_PTR'
export const PDWORD32 = 'uint32*'
export const PDWORD64 = 'uint64*'
export const PFLOAT = 'float*'
export const PHALF_PTR = 'pointer' // ? A pointer to a HALF_PTR.
export const PHANDLE = _WIN64_HOLDER
export const PHKEY = _WIN64_HOLDER
export const PINT = 'int*'
export const PINT_PTR = 'int**'
export const PINT8 = 'int8*'
export const PINT16 = 'int16*'
export const PINT32 = 'int32*'
export const PINT64 = 'int64*'
export const PLCID = 'uint32*'
export const PLONG = 'long*'
export const PLONGLONG = 'int64*'
export const PLONG_PTR = 'LONG_PTR'
export const PLONG32 = 'int32*'
export const PLONG64 = 'int64*'
// ? A 32-bit pointer. On a 32-bit system, this is a native pointer.
// On a 64-bit system, this is a truncated 64-bit pointer.
export const POINTER_32 = _WIN64_HOLDER
// ? A 64-bit pointer. On a 64-bit system, this is a native pointer.
// On a 32-bit system, this is a sign-extended 32-bit pointer.
export const POINTER_64 = _WIN64_HOLDER
export const POINTER_SIGNED = 'pointer'   // ? A signed pointer.
export const POINTER_UNSIGNED = 'pointer' // An unsigned pointer.
export const PSHORT = 'int16*'
export const PSIZE_T = 'ULONG_PTR'   // ?
export const PSSIZE_T = 'pointer'
export const PSTR = 'char*'
export const PTBYTE = _UNICODE_HOLDER
export const PTCHAR = _UNICODE_HOLDER
export const PTSTR = _UNICODE_HOLDER
export const PUCHAR = 'pointer'
export const PUHALF_PTR = 'pointer'
export const PUINT = 'uint*'
export const PUINT_PTR = 'uint**'
export const PUINT8 = 'uint8*'
export const PUINT16 = 'uint16*'
export const PUINT32 = 'uint32*'
export const PUINT64 = 'uint64*'
export const PULONG = 'uint*'
export const PULONGLONG = 'uint64*'
export const PULONG_PTR = 'uint64**'
export const PULONG32 = 'uint*'
export const PULONG64 = 'uint64*'
export const PUSHORT = 'uint16*'
export const PWCHAR = 'uint16*'
export const PWORD = 'uint16*'
export const PWSTR = 'uint16*'
export const QWORD = 'uint64'
export const SC_HANDLE = 'HANDLE'
export const SC_LOCK = 'LPVOID'
export const SERVICE_STATUS_HANDLE = 'HANDLE'
export const SHORT = 'int16'
export const SIZE_T = 'ULONG_PTR'    // ?
export const SSIZE_T = 'LONG_PTR'    // ?
export const TBYTE = _UNICODE_HOLDER
export const TCHAR = _UNICODE_HOLDER
export const UCHAR = 'uchar'
export const UHALF_PTR = _WIN64_HOLDER
export const UINT = 'uint'
export const UINT_PTR = 'uint'
export const UINT8 = 'uint8'
export const UINT16 = 'uint16'
export const UINT32 = 'uint32'
export const UINT64 = 'uint64'
export const ULONG = 'uint'
export const ULONGLONG = 'uint64'
export const ULONG32 = 'uint32'
export const ULONG64 = 'uint64'
export const USHORT = 'ushort'
export const UNICODE_STRING = 'pointer'
export const USN = 'LONGLONG'
// export const WINAPI;
export const WINEVENTPROC = 'pointer'
export const WNDENUMPROC = 'pointer'
export const WNDPROC = 'pointer'

/**
 * Caution: original be  typedef UINT_PTR WPARAM;
 * but the CALLBACK WNDCLASSEX.lpfnWndProc will pass negative number and cause process exit.
 * so change to LONG_PTR
 */
// export const WPARAM = UINT_PTR;
export const WPARAM = 'LONG_PTR'

export const LPINITCOMMONCONTROLSEX = 'pointer'  // A pointer to an INITCOMMONCONTROLSEX
export const LPWNDCLASSEX = 'pointer'  // A pointer to a WNDCLASSEX
export const PWINDOWINFO = 'pointer'    // A pointer to a WINDOWINFO structure

export const va_list = 'char*'

/* ------------------ struct ---------------------- */
export const INITCOMMONCONTROLSEX = 'pointer'
export const MSG = 'pointer'
export const POINT = 'pointer'
export const WNDCLASSEX = 'pointer'

export const WINDOWINFO = 'pointer'
export const RECT = 'pointer'  // _RECT
