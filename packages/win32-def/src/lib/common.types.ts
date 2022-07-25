/*  ---------- data types for TypeScript ----------- */
// https://docs.microsoft.com/en-us/windows/win32/winprog/windows-data-types
// https://docs.microsoft.com/en-us/windows/win32/winprog64/the-new-data-types
// https://docs.microsoft.com/en-us/windows/win32/intl/windows-data-types-for-strings

import { BigIntStr } from '@waiting/shared-types'
// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'


export type _POINTER = Buffer
export type WNDPROC = Buffer
/** number: 32bit, bitint: 64bit  */
export type PTR_Addr = number | BigIntStr

/**
 * @link https://docs.microsoft.com/en-us/windows/win32/secauthz/access-mask-format
 */
export type ACCESS_MASK = number
export type ATOM = number // uint16
export type DWORD = number
export type PVOID = Buffer
/**
 * `uint32` or `uint64` used as value usage (memory address) instead of PVOID (Buffer),
 * Use `HANDLE` (number) for params defintion of the api,
 * @see https://stackoverflow.com/questions/18266626/what-is-the-range-of-a-windows-handle-on-a-64-bits-application/29526711#29526711
 */
export type HANDLE = number | BigIntStr
/**
 * `HANDLE_PVOID` (Buffer) can be used for definition of Struct,
 */
export type HANDLE_PVOID = PVOID
export type LONG_PTR = PTR_Addr
export type ULONG_PTR = PTR_Addr
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type VOID = any
export type WCHAR = UINT16
export type WCHAR_String = string
export type PWCHAR_String = _POINTER

export type BOOL = number
export type BOOLEAN = boolean
export type BYTE = number
/** https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx */
export type CALLBACK = WNDPROC
export type CCHAR = UINT8
export type CHAR = UINT8
export type COLORREF = number

export type DWORDLONG = number
export type DWORD_PTR = ULONG_PTR
export type DWORD32 = number
export type DWORD64 = number
export type FLOAT = number
export type HACCEL = HANDLE
export type HALF_PTR = number
export type HBITMAP = HANDLE
export type HBRUSH = HANDLE
export type HCOLORSPACE = HANDLE
export type HCONV = HANDLE
export type HCONVLIST = HANDLE
export type HCURSOR = HANDLE
export type HDC = HANDLE
export type HDDEDATA = HANDLE
export type HDESK = HANDLE
export type HDROP = HANDLE
export type HDWP = HANDLE
export type HENHMETAFILE = HANDLE
export type HFILE = HANDLE
export type HFONT = HANDLE
export type HGDIOBJ = HANDLE
export type HGLOBAL = HANDLE
export type HHOOK = HANDLE
export type HICON = HANDLE
export type HINSTANCE = HANDLE
export type HKEY = HANDLE
export type HKL = HANDLE
export type HLOCAL = HANDLE
export type HMENU = HANDLE
export type HMETAFILE = HANDLE
export type HMODULE = HINSTANCE
export type HMONITOR = HANDLE
export type HPALETTE = HANDLE
export type HPEN = HANDLE
export type HRESULT = LONG
export type HRGN = HANDLE
export type HRSRC = HANDLE
export type HSZ = HANDLE
export type HWINEVENTHOOK = HANDLE
export type HWINSTA = HANDLE
export type HWND = HANDLE // for use of hWnd.ref(), deref() etc
/** A 32-bit signed integer */
export type INT = number
export type INT_PTR = PTR_Addr
export type INT8 = number
export type INT16 = number
export type INT32 = number
export type INT64 = BigIntStr
export type LANGID = WORD
export type LCID = DWORD
export type LCTYPE = DWORD
export type LGRPID = DWORD
export type LONG = number
export type LONGLONG = BigIntStr
export type LONG32 = number
export type LONG64 = BigIntStr
export type LPARAM = LONG_PTR
export type LPBOOL = _POINTER
export type LPBYTE = _POINTER
export type LPCOLORREF = _POINTER
export type LPCSTR = _POINTER
export type LPCWSTR = PUINT8
export type LPCTSTR = PUINT16
export type LPVOID = _POINTER
export type LPCVOID = LPVOID
export type LPDWORD = PUINT16
export type LPHANDLE = _POINTER
export type LPINT = PINT
export type LPLONG = PINT32
export type LPMSG = _POINTER
export type LPPOINT = _POINTER
export type LPSTR = _POINTER
export type LPWSTR = PUINT16
export type LPTSTR = _POINTER
export type LPWORD = PUINT16
export type LRESULT = number
export type NTSTATUS = UINT32
export type PBOOL = _POINTER
export type PBOOLEAN = _POINTER
export type PBYTE = _POINTER
export type PCHAR = _POINTER
export type PCSTR = PUINT8
export type PCTSTR = _POINTER
export type PCWSTR = PUINT16
export type PDWORD = PUINT32
export type PDWORDLONG = PUINT64
export type PDWORD_PTR = DWORD_PTR
export type PDWORD32 = _POINTER
export type PDWORD64 = _POINTER
export type PFLOAT = _POINTER
export type PHALF_PTR = _POINTER
export type PHANDLE = _POINTER
export type PHKEY = _POINTER
export type PINT = _POINTER
export type PINT_PTR = _POINTER
export type PINT8 = _POINTER
export type PINT16 = _POINTER
export type PINT32 = _POINTER
export type PINT64 = _POINTER
export type PLCID = _POINTER
export type PLONG = _POINTER
export type PLONGLONG = _POINTER
export type PLONG_PTR = _POINTER
export type PLONG32 = _POINTER
export type PLONG64 = _POINTER
export type POINTER_32 = _POINTER
export type POINTER_64 = _POINTER
export type POINTER_SIGNED = _POINTER
export type POINTER_UNSIGNED = _POINTER
export type PSHORT = _POINTER
export type PSIZE_T = _POINTER
export type PSSIZE_T = _POINTER
export type PSTR = _POINTER
export type PTBYTE = _POINTER
export type PTCHAR = _POINTER
export type PTSTR = _POINTER
export type PUCHAR = _POINTER
export type PUHALF_PTR = _POINTER
export type PUINT = _POINTER
export type PUINT_PTR = _POINTER
export type PUINT8 = _POINTER
export type PUINT16 = _POINTER
export type PUINT32 = _POINTER
export type PUINT64 = _POINTER
export type PULONG = _POINTER
export type PULONGLONG = _POINTER
export type PULONG_PTR = _POINTER
export type PULONG32 = _POINTER
export type PULONG64 = _POINTER
export type PUSHORT = _POINTER
export type PWCHAR = _POINTER
export type PWORD = _POINTER
export type PWSTR = _POINTER
export type QWORD = BigIntStr
export type SC_HANDLE = HANDLE
export type SC_LOCK = LPVOID
export type SERVICE_STATUS_HANDLE = HANDLE
export type SHORT = number
export type SIZE_T = number
export type SSIZE_T = number
export type TBYTE = number
export type TCHAR = string
export type UCHAR = string
export type UHALF_PTR = number
export type UINT = number
export type UINT_PTR = number | BigIntStr
export type UINT8 = number
export type UINT16 = number
export type UINT32 = number
export type UINT64 = BigIntStr
export type ULONG = number
export type ULONGLONG = BigIntStr
export type ULONG32 = number
export type ULONG64 = BigIntStr
export type USHORT = number
export type USN = LONGLONG
export type WINEVENTPROC = WNDPROC
export type WNDENUMPROC = WNDPROC
export type WORD = INT16
export type WPARAM = UINT_PTR



export type va_list = _POINTER

/* ------------------ struct ---------------------- */
// see src/lib/win-model/struct.ts


export interface StructInstanceBase {
  ref: () => Buffer
}

export interface UnionInstanceBase {
  ref: () => Buffer
}


export interface StringBuffer extends ref.Type<string> {
  size: number
  encoding: BufferEncoding | void
  set: (
    buffer: Buffer,
    offset: number,
    value: string | number[] | Buffer,
  ) => void
}


/**
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getprinter#parameters
 */
export type PRINTER_INFO_LEVEL = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
/**
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/enumprinters
 */
export type EnumPrinters_Level = 1 | 2 | 4 | 5


/**
 * Convert Struct property to WCHAR_String if Buffer
 */
export type StructPropToWCHAR<T> = {
  [P in keyof T]: T[P] extends Buffer
    ? WCHAR_String
    : T[P]
}
/**
 * Convert Struct property to Buffer if WCHAR_String
 */
export type StructPropToBuffer<T> = {
  [P in keyof T]: T[P] extends WCHAR_String
    ? Buffer
    : T[P]
}

