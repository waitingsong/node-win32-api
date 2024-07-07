// windows data types for ref module https://github.com/TooTallNate/ref
// https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751

import { config } from './config.js'
import { Def } from './def.enum.js'


const { _WIN64 } = config

/**
 * @link https://docs.microsoft.com/en-us/windows/win32/secauthz/access-mask-format
 */
export const ACCESS_MASK: Def.int32 = Def.int32
export const ATOM: Def.uint16 = Def.uint16
export const DWORD: Def.uint32 = Def.uint32
export const ptr: Def.uint32Ptr | Def.uint64Ptr = _WIN64 ? Def.uint64Ptr : Def.uint32Ptr
export const PVOID: Def.voidPtr = Def.voidPtr
/**
 * `uint32` or `uint64` used as value usage (memory address) instead of PVOID (Buffer),
 * Use `HANDLE` (number) for params definition of the api,
 * @see https://stackoverflow.com/questions/18266626/what-is-the-range-of-a-windows-handle-on-a-64-bits-application/29526711#29526711
 */
export const HANDLE: Def.uint32 | Def.uint64 = _WIN64 ? Def.uint64 : Def.uint32
/**
 * `HANDLE_PVOID` (Buffer) can be used for definition of Struct,
 */
export const HANDLE_PVOID: Def.voidPtr = PVOID
export const LONG_PTR: Def.int32 | Def.int64 = _WIN64 ? Def.int64 : Def.int32
export const ULONG_PTR: Def.int32 | Def.int64 = _WIN64 ? Def.int64 : Def.int32
export const VOID: Def.void = Def.void
export const WCHAR: Def.uint16 = Def.uint16
export const WORD: Def.int16 = Def.int16

export const BOOL: Def.int32 = Def.int32
export const BOOLEAN: Def.bool = Def.bool
export const BYTE: Def.byte = Def.byte
export const CALLBACK: Def.uint32Ptr | Def.uint64Ptr = ptr // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
export const CCHAR: Def.uint8 = Def.uint8
export const CHAR: Def.uint8 = Def.uint8
export const COLORREF: Def.uint32 = DWORD
// export const CONST;
export const DWORDLONG: Def.uint64 = Def.uint64
export const DWORD_PTR: Def.int32 | Def.int64 = ULONG_PTR
export const DWORD32: Def.uint32 = Def.uint32
export const DWORD64: Def.uint64 = Def.uint64
export const FLOAT: Def.float = Def.float
export const HACCEL: Def.uint32 | Def.uint64 = HANDLE
export const HALF_PTR: Def.int16 | Def.int32 = _WIN64 ? Def.int32 : Def.int16
export const HBITMAP: Def.uint32 | Def.uint64 = HANDLE
export const HBRUSH: Def.uint32 | Def.uint64 = HANDLE
export const HCOLORSPACE: Def.uint32 | Def.uint64 = HANDLE
export const HCONV: Def.uint32 | Def.uint64 = HANDLE
export const HCONVLIST: Def.uint32 | Def.uint64 = HANDLE
export const HCURSOR: Def.uint32 | Def.uint64 = HANDLE
export const HDC: Def.uint32 | Def.uint64 = HANDLE
export const HDDEDATA: Def.uint32 | Def.uint64 = HANDLE
export const HDESK: Def.uint32 | Def.uint64 = HANDLE
export const HDROP: Def.uint32 | Def.uint64 = HANDLE
export const HDWP: Def.uint32 | Def.uint64 = HANDLE
export const HENHMETAFILE: Def.uint32 | Def.uint64 = HANDLE
export const HFILE: Def.uint32 | Def.uint64 = HANDLE
export const HFONT: Def.uint32 | Def.uint64 = HANDLE
export const HGDIOBJ: Def.uint32 | Def.uint64 = HANDLE
export const HGLOBAL: Def.uint32 | Def.uint64 = HANDLE
export const HHOOK: Def.uint32 | Def.uint64 = HANDLE
export const HICON: Def.uint32 | Def.uint64 = HANDLE
export const HINSTANCE: Def.uint32 | Def.uint64 = HANDLE
export const HKEY: Def.uint32 | Def.uint64 = HANDLE
export const HKL: Def.uint32 | Def.uint64 = HANDLE
export const HLOCAL: Def.uint32 | Def.uint64 = HANDLE
export const HMENU: Def.uint32 | Def.uint64 = HANDLE
export const HMETAFILE: Def.uint32 | Def.uint64 = HANDLE
export const HMODULE: Def.uint32 | Def.uint64 = HINSTANCE
export const HMONITOR: Def.uint32 | Def.uint64 = HANDLE
export const HPALETTE: Def.uint32 | Def.uint64 = HANDLE
export const HPEN: Def.uint32 | Def.uint64 = HANDLE
export const HRESULT: Def.long = Def.long
export const HRGN: Def.uint32 | Def.uint64 = HANDLE
export const HRSRC: Def.uint32 | Def.uint64 = HANDLE
export const HSZ: Def.uint32 | Def.uint64 = HANDLE
export const HWINEVENTHOOK: Def.uint32 | Def.uint64 = HANDLE
export const HWINSTA: Def.uint32 | Def.uint64 = HANDLE
export const HWND: Def.uint32 | Def.uint64 = HANDLE
/** A 32-bit signed integer */
export const INT: Def.int = Def.int
export const INT_PTR: Def.int32Ptr | Def.int64Ptr = _WIN64 ? Def.int64Ptr : Def.int32Ptr
export const INT8: Def.int8 = Def.int8
export const INT16: Def.int16 = Def.int16
export const INT32: Def.int32 = Def.int32
export const INT64: Def.int64 = Def.int64
export const LANGID: Def.int16 = WORD
export const LCID: Def.uint32 = DWORD
export const LCTYPE: Def.uint32 = DWORD
export const LGRPID: Def.uint32 = DWORD
export const LONG: Def.long = Def.long
export const LONGLONG: Def.longlong = Def.longlong
export const LONG32: Def.int32 = Def.int32
export const LONG64: Def.int64 = Def.int64
export const LPARAM: Def.int32 | Def.int64 = LONG_PTR
export const LPBOOL: Def.int32 = BOOL
export const LPBYTE: Def.bytePtr = Def.bytePtr
export const LPCOLORREF: Def.uint32 = DWORD
export const LPCSTR: Def.int8Ptr = Def.int8Ptr
export const LPCWSTR: Def.int16Ptr = Def.int16Ptr
export const LPCTSTR: Def.int16Ptr = Def.int16Ptr
export const LPVOID: Def.voidPtr = Def.voidPtr
export const LPCVOID: Def.voidPtr = LPVOID
export const LPDWORD: Def.uint16Ptr = Def.uint16Ptr
export const LPHANDLE: Def.int32Ptr | Def.int64Ptr = _WIN64 ? Def.int64Ptr : Def.int32Ptr
export const LPINT: Def.uint32Ptr | Def.uint64Ptr = ptr
export const LPLONG: Def.int32Ptr = Def.int32Ptr
export const LPSTR: Def.charPtr = Def.charPtr
export const LPWSTR: Def.uint16Ptr = Def.uint16Ptr
export const LPTSTR: Def.uint16Ptr = Def.uint16Ptr
export const LPWORD: Def.uint16Ptr = Def.uint16Ptr
export const LRESULT: Def.int32 | Def.int64 = LONG_PTR
export const NTSTATUS: Def.uint32 = Def.uint32
export const PBOOL: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PBOOLEAN: Def.boolPtr = Def.boolPtr
export const PBYTE: Def.bytePtr = Def.bytePtr
export const PCHAR: Def.charPtr = Def.charPtr
export const PCSTR: Def.uint8Ptr = Def.uint8Ptr
export const PCTSTR: Def.int8Ptr | Def.int16Ptr = _WIN64 ? Def.int16Ptr : Def.int8Ptr
export const PCWSTR: Def.uint16Ptr = Def.uint16Ptr
export const PDWORD: Def.uint32Ptr = Def.uint32Ptr
export const PDWORDLONG: Def.uint64Ptr = Def.uint64Ptr
export const PDWORD_PTR: Def.int32 | Def.int64 = DWORD_PTR
export const PDWORD32: Def.uint32Ptr = Def.uint32Ptr
export const PDWORD64: Def.uint64Ptr = Def.uint64Ptr
export const PFLOAT: Def.floatPtr = Def.floatPtr
export const PHALF_PTR: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PHANDLE: Def.uint32PtrPtr | Def.uint64PtrPtr = _WIN64 ? Def.uint64PtrPtr : Def.uint32PtrPtr
export const PHKEY: Def.uint32PtrPtr | Def.uint64PtrPtr = _WIN64 ? Def.uint64PtrPtr : Def.uint32PtrPtr
export const PINT: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PINT_PTR: Def.intPtrPtr = Def.intPtrPtr
export const PINT8: Def.int8Ptr = Def.int8Ptr
export const PINT16: Def.int16Ptr = Def.int16Ptr
export const PINT32: Def.int32Ptr = Def.int32Ptr
export const PINT64: Def.int64Ptr = Def.int64Ptr
export const PLCID: Def.uint32Ptr = Def.uint32Ptr
export const PLONG: Def.longPtr = Def.longPtr
export const PLONGLONG: Def.int64Ptr = Def.int64Ptr
export const PLONG_PTR: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PLONG32: Def.int32Ptr = Def.int32Ptr
export const PLONG64: Def.int64Ptr = Def.int64Ptr
// ? A 32-bit pointer. On a 32-bit system, this is a native pointer.
// On a 64-bit system, this is a truncated 64-bit pointer.
export const POINTER_32: Def.int32Ptr = _WIN64 ? Def.int32Ptr : Def.int32Ptr
// ? A 64-bit pointer. On a 64-bit system, this is a native pointer.
// On a 32-bit system, this is a sign-extended 32-bit pointer.
export const POINTER_64: Def.int32Ptr | Def.int64Ptr = _WIN64 ? Def.int64Ptr : Def.int32Ptr
export const POINTER_SIGNED: Def.uint32Ptr | Def.uint64Ptr = ptr
export const POINTER_UNSIGNED: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PSHORT: Def.int16Ptr = Def.int16Ptr
export const PSIZE_T: Def.int32 | Def.int64 = ULONG_PTR
export const PSSIZE_T: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PSTR: Def.charPtr = Def.charPtr
export const PTBYTE: Def.int16Ptr = Def.int16Ptr
export const PTCHAR: Def.uint16Ptr = Def.uint16Ptr
export const PTSTR: Def.uint16Ptr = Def.uint16Ptr
export const PUCHAR: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PUHALF_PTR: Def.uint32Ptr | Def.uint64Ptr = ptr
export const PUINT: Def.uintPtr = Def.uintPtr
export const PUINT_PTR: Def.uintPtrPtr = Def.uintPtrPtr
export const PUINT8: Def.uint8Ptr = Def.uint8Ptr
export const PUINT16: Def.uint16Ptr = Def.uint16Ptr
export const PUINT32: Def.uint32Ptr = Def.uint32Ptr
export const PUINT64: Def.uint64Ptr = Def.uint64Ptr
export const PULONG: Def.uintPtr = Def.uintPtr
export const PULONGLONG: Def.uint64Ptr = Def.uint64Ptr
export const PULONG_PTR: Def.uint64PtrPtr = Def.uint64PtrPtr
export const PULONG32: Def.uintPtr = Def.uintPtr
export const PULONG64: Def.uint64Ptr = Def.uint64Ptr
export const PUSHORT: Def.uint16Ptr = Def.uint16Ptr
export const PWCHAR: Def.uint16Ptr = Def.uint16Ptr
export const PWORD: Def.uint16Ptr = Def.uint16Ptr
export const PWSTR: Def.uint16Ptr = Def.uint16Ptr
export const QWORD: Def.uint64 = Def.uint64
export const SC_HANDLE: Def.uint32 | Def.uint64 = HANDLE
export const SC_LOCK: Def.voidPtr = LPVOID
export const SERVICE_STATUS_HANDLE: Def.uint32 | Def.uint64 = HANDLE
export const SHORT: Def.int16 = Def.int16
export const SIZE_T: Def.int32 | Def.int64 = ULONG_PTR
export const SSIZE_T: Def.int32 | Def.int64 = LONG_PTR
export const TBYTE: Def.int16 = Def.int16
export const TCHAR: Def.uint16 = Def.uint16
export const UCHAR: Def.uchar = Def.uchar
export const UHALF_PTR: Def.uint16 | Def.uint32 = _WIN64 ? Def.uint32 : Def.uint16
export const UINT: Def.uint = Def.uint
export const UINT_PTR: Def.uint32 | Def.uint64 = _WIN64 ? Def.uint64 : Def.uint32
export const UINT8: Def.uint8 = Def.uint8
export const UINT16: Def.uint16 = Def.uint16
export const UINT32: Def.uint32 = Def.uint32
export const UINT64: Def.uint64 = Def.uint64
export const ULONG: Def.uint = Def.uint
export const ULONGLONG: Def.uint64 = Def.uint64
export const ULONG32: Def.uint32 = Def.uint32
export const ULONG64: Def.uint64 = Def.uint64
export const USHORT: Def.ushort = Def.ushort
export const USN: Def.longlong = LONGLONG
// export const WINAPI;
export const WINEVENTPROC: Def.uint32Ptr | Def.uint64Ptr = ptr
export const WNDENUMPROC: Def.uint32Ptr | Def.uint64Ptr = ptr
export const WNDPROC: Def.voidPtr = Def.voidPtr
export const DLGPROC: Def.voidPtr = Def.voidPtr

/**
 * Note: original be typedef UINT_PTR WPARAM;
 * CALLBACK WNDCLASSEX.lpfnWndProc may pass negative number and cause process exit.
 */
export const WPARAM: Def.uint32 | Def.uint64 = UINT_PTR


// from https://koffi.dev/input
export const va_list = 'str16'
/**
 * For 'str16' from https://koffi.dev/input
 */
export const WString = 'str16'
export const String = 'str'

