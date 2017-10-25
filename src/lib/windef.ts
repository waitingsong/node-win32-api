// windows data types for ref module https://github.com/TooTallNate/ref
// https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751

import * as Conf from './conf';
import * as GT from './types';

/**
 * macro convert method
 * [Conf._WIN64_HOLDER or Conf._UNICODE_HOLDER,  value first, value second ]
 *
 * demo: const PVOID = [Conf._WIN64_HOLDER, 'uint64*', 'uint32*'];
 */
export const ATOM = 'uint16';
export const DWORD = 'uint32';
export const PVOID: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64*', 'uint32*'];    // [_WIN64, _ia32]
export const HANDLE: GT.MacroParam<string> = PVOID;
export const LONG_PTR: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'int64', 'int32'];
export const ULONG_PTR: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64', 'uint32'];
export const VOID = 'void';
export const WCHAR = 'uint16';
export const WORD = 'int16';

export const BOOL = 'int';
export const BOOLEAN = 'bool';
export const BYTE = 'byte';
export const CALLBACK = 'pointer';  // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
export const CCHAR = 'char';
export const CHAR = 'char';
export const COLORREF = DWORD;
// export const CONST;
export const DWORDLONG = 'uint64';
export const DWORD_PTR: GT.MacroParam<string> = ULONG_PTR;
export const DWORD32 = 'uint32';
export const DWORD64 = 'uint64';
export const FLOAT = 'float';
export const HACCEL: GT.MacroParam<string> = HANDLE;
export const HALF_PTR: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'int32', 'int16'];
export const HBITMAP: GT.MacroParam<string> = HANDLE;
export const HBRUSH: GT.MacroParam<string> = HANDLE;
export const HCOLORSPACE: GT.MacroParam<string> = HANDLE;
export const HCONV: GT.MacroParam<string> = HANDLE;
export const HCONVLIST: GT.MacroParam<string> = HANDLE;
export const HCURSOR: GT.MacroParam<string> = HANDLE;
export const HDC: GT.MacroParam<string> = HANDLE;
export const HDDEDATA: GT.MacroParam<string> = HANDLE;
export const HDESK: GT.MacroParam<string> = HANDLE;
export const HDROP: GT.MacroParam<string> = HANDLE;
export const HDWP: GT.MacroParam<string> = HANDLE;
export const HENHMETAFILE: GT.MacroParam<string> = HANDLE;
export const HFILE: GT.MacroParam<string> = HANDLE;    // typedef int HFILE;
export const HFONT: GT.MacroParam<string> = HANDLE;
export const HGDIOBJ: GT.MacroParam<string> = HANDLE;
export const HGLOBAL: GT.MacroParam<string> = HANDLE;
export const HHOOK: GT.MacroParam<string> = HANDLE;
export const HICON: GT.MacroParam<string> = HANDLE;
export const HINSTANCE: GT.MacroParam<string> = HANDLE;
export const HKEY: GT.MacroParam<string> = HANDLE;
export const HKL: GT.MacroParam<string> = HANDLE;
export const HLOCAL: GT.MacroParam<string> = HANDLE;
export const HMENU: GT.MacroParam<string> = HANDLE;
export const HMETAFILE: GT.MacroParam<string> = HANDLE;
export const HMODULE: GT.MacroParam<string> = HINSTANCE;
export const HMONITOR: GT.MacroParam<string> = HANDLE;
export const HPALETTE: GT.MacroParam<string> = HANDLE;
export const HPEN: GT.MacroParam<string> = HANDLE;
export const HRESULT = 'long';
export const HRGN: GT.MacroParam<string> = HANDLE;
export const HRSRC: GT.MacroParam<string> = HANDLE;
export const HSZ: GT.MacroParam<string> = HANDLE;
export const HWINEVENTHOOK: GT.MacroParam<string> = HANDLE;
export const HWINSTA: GT.MacroParam<string> = HANDLE;
export const HWND: GT.MacroParam<string> = HANDLE;
export const INT = 'int';
export const INT_PTR: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'int64', 'int32'];
export const INT8 = 'int8';
export const INT16 = 'int16';
export const INT32 = 'int32';
export const INT64 = 'int64';
export const LANGID = WORD;
export const LCID = DWORD;
export const LCTYPE = DWORD;
export const LGRPID = DWORD;
export const LONG = 'long';
export const LONGLONG = 'longlong';
export const LONG32 = 'int32';
export const LONG64 = 'int64';
export const LPARAM: GT.MacroParam<string> = LONG_PTR;
export const LPBOOL = BOOL;
export const LPBYTE = BYTE;
export const LPCOLORREF = DWORD;
export const LPCSTR = 'uint8*';
export const LPCWSTR = 'uint16*';
export const LPCTSTR: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, LPCWSTR, LPCSTR];
export const LPVOID = 'void*';
export const LPCVOID = LPVOID;
export const LPDWORD = 'uint16*';
export const LPHANDLE: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64*', 'uint32*'];   // A pointer to a HANDLE.
export const LPINT = 'int*';
export const LPLONG = 'int32*';
export const LPMSG = 'pointer'; // A pointer to a MSG
export const LPSTR = 'char*';
export const LPWSTR = 'uint16*';
export const LPTSTR: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, LPWSTR, 'uint8*'];
export const LPWORD = 'uint16*';
export const LRESULT: GT.MacroParam<string> = LONG_PTR;
export const PBOOL = 'int*';    // ? 'bool*'
export const PBOOLEAN = 'bool*';
export const PBYTE = 'byte*';
export const PCHAR = 'char*';
export const PCSTR = 'uint8*';
export const PCTSTR: GT.MacroParam<string> = [Conf._WIN64_HOLDER, LPCWSTR, LPCSTR];
export const PCWSTR = 'uint16*';
export const PDWORD = 'uint32*';
export const PDWORDLONG = 'uint64*';
export const PDWORD_PTR: GT.MacroParam<string> = DWORD_PTR;
export const PDWORD32 = 'uint32*';
export const PDWORD64 = 'uint64*';
export const PFLOAT = 'float*';
export const PHALF_PTR: GT.MacroParam<string> = 'pointer'; // ? A pointer to a HALF_PTR.
export const PHANDLE: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64**', 'uint32**'];
export const PHKEY: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64*', 'uint32*'];
export const PINT = 'int*';
export const PINT_PTR = 'int**';
export const PINT8 = 'int8*';
export const PINT16 = 'int16*';
export const PINT32 = 'int32*';
export const PINT64 = 'int64*';
export const PLCID = 'uint32*';
export const PLONG = 'long*';
export const PLONGLONG = 'int64*';
export const PLONG_PTR: GT.MacroParam<string> = LONG_PTR;
export const PLONG32 = 'int32*';
export const PLONG64 = 'int64*';
export const POINTER_32: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64*', 'uint32*'];   // ? A 32-bit pointer. On a 32-bit system, this is a native pointer. On a 64-bit system, this is a truncated 64-bit pointer.
export const POINTER_64: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint64*', 'uint32*'];  // ? A 64-bit pointer. On a 64-bit system, this is a native pointer. On a 32-bit system, this is a sign-extended 32-bit pointer.
export const POINTER_SIGNED = 'pointer';   // ? A signed pointer.
export const POINTER_UNSIGNED = 'pointer'; // An unsigned pointer.
export const PSHORT = 'int16*';
export const PSIZE_T: GT.MacroParam<string> = ULONG_PTR;   // ?
export const PSSIZE_T = 'pointer';
export const PSTR = 'char*';
export const PTBYTE: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, 'int16*', 'int8*'];
export const PTCHAR: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, 'uint16*', 'uint8*'];
export const PTSTR: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, LPWSTR, LPSTR];
export const PUCHAR = 'pointer';
export const PUHALF_PTR = 'pointer';
export const PUINT = 'uint*';
export const PUINT_PTR = 'uint**';
export const PUINT8 = 'uint8*';
export const PUINT16 = 'uint16*';
export const PUINT32 = 'uint32*';
export const PUINT64 = 'uint64*';
export const PULONG = 'uint*';
export const PULONGLONG = 'uint64*';
export const PULONG_PTR = 'uint64**';
export const PULONG32 = 'uint*';
export const PULONG64 = 'uint64*';
export const PUSHORT = 'uint16*';
export const PWCHAR = 'uint16*';
export const PWORD = 'uint16*';
export const PWSTR = 'uint16*';
export const QWORD = 'uint64';
export const SC_HANDLE: GT.MacroParam<string> = HANDLE;
export const SC_LOCK = LPVOID;
export const SERVICE_STATUS_HANDLE: GT.MacroParam<string> = HANDLE;
export const SHORT = 'int16';
export const SIZE_T: GT.MacroParam<string> = ULONG_PTR;    // ?
export const SSIZE_T: GT.MacroParam<string> = LONG_PTR;    // ?
export const TBYTE: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, 'int16', 'int8'];
export const TCHAR: GT.MacroParam<string> = [Conf._UNICODE_HOLDER, WCHAR, 'uint8'];
export const UCHAR = 'uchar';
export const UHALF_PTR: GT.MacroParam<string> = [Conf._WIN64_HOLDER, 'uint32', 'uint16'];
export const UINT = 'uint';
export const UINT_PTR = 'uint';
export const UINT8 = 'uint8*';
export const UINT16 = 'uint16*';
export const UINT32 = 'uint32*';
export const UINT64 = 'uint64*';
export const ULONG = 'uint*';
export const ULONGLONG = 'uint64*';
export const ULONG32 = 'uint32';
export const ULONG64 = 'uint64';
export const USHORT = 'ushort';
export const UNICODE_STRING = 'pointer';
export const USN = LONGLONG;
// export const WINAPI;
export const WINEVENTPROC = 'pointer';
export const WNDENUMPROC = 'pointer';
export const WNDPROC = 'pointer';

/**
 * Caution: original be  typedef UINT_PTR WPARAM;
 * but the CALLBACK WNDCLASSEX.lpfnWndProc will pass negative number and cause process exit.
 * so change to LONG_PTR
 */
//export const WPARAM = UINT_PTR;
export const WPARAM: GT.MacroParam<string> = LONG_PTR;

export const LPINITCOMMONCONTROLSEX = 'pointer';  // A pointer to an INITCOMMONCONTROLSEX
export const LPWNDCLASSEX = 'pointer';  // A pointer to a WNDCLASSEX
export const PWINDOWINFO = 'pointer';    // A pointer to a WINDOWINFO structure

export const va_list = 'char*';

/* ------------------ struct ---------------------- */
export const INITCOMMONCONTROLSEX = 'pointer';
export const MSG = 'pointer';
export const POINT = 'pointer';
export const WNDCLASSEX = 'pointer';

export const WINDOWINFO = 'pointer';
export const RECT = 'pointer';  // _RECT
