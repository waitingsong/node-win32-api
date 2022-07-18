// windows data types for ref module https://github.com/TooTallNate/ref
// https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751

import { config } from './config.js'
import { Def } from './def.enum.js'


const { _WIN64 } = config

/**
 * @link https://docs.microsoft.com/en-us/windows/win32/secauthz/access-mask-format
 */
export const ACCESS_MASK = Def.int32
export const ATOM = Def.uint16
export const DWORD = Def.uint32
export const PVOID = _WIN64 ? Def.uint64Ptr : Def.uint32Ptr
/**
 * `uint32` or `uint64` used as value usage (memory address) instead of PVOID (Buffer),
 * Use `HANDLE` (number) for params defintion of the api,
 * @see https://stackoverflow.com/questions/18266626/what-is-the-range-of-a-windows-handle-on-a-64-bits-application/29526711#29526711
 */
export const HANDLE = _WIN64 ? Def.uint64 : Def.uint32
/**
 * `HANDLE_PVOID` (Buffer) can be used for definition of Struct,
 */
export const HANDLE_PVOID = PVOID
export const LONG_PTR = _WIN64 ? Def.int64 : Def.int32
export const ULONG_PTR = _WIN64 ? Def.int64 : Def.int32
export const VOID = Def.void
export const WCHAR = Def.uint16
export const WORD = Def.int16

export const BOOL = Def.int
export const BOOLEAN = Def.bool
export const BYTE = Def.byte
export const CALLBACK = Def.ptr // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
export const CCHAR = Def.uint8
export const CHAR = Def.uint8
export const COLORREF = DWORD
// export const CONST;
export const DWORDLONG = Def.uint64
export const DWORD_PTR = ULONG_PTR
export const DWORD32 = Def.uint32
export const DWORD64 = Def.uint64
export const FLOAT = Def.float
export const HACCEL = HANDLE
export const HALF_PTR = _WIN64 ? Def.int32 : Def.int16
export const HBITMAP = HANDLE
export const HBRUSH = HANDLE
export const HCOLORSPACE = HANDLE
export const HCONV = HANDLE
export const HCONVLIST = HANDLE
export const HCURSOR = HANDLE
export const HDC = HANDLE
export const HDDEDATA = HANDLE
export const HDESK = HANDLE
export const HDROP = HANDLE
export const HDWP = HANDLE
export const HENHMETAFILE = HANDLE
export const HFILE = HANDLE
export const HFONT = HANDLE
export const HGDIOBJ = HANDLE
export const HGLOBAL = HANDLE
export const HHOOK = HANDLE
export const HICON = HANDLE
export const HINSTANCE = HANDLE
export const HKEY = HANDLE
export const HKL = HANDLE
export const HLOCAL = HANDLE
export const HMENU = HANDLE
export const HMETAFILE = HANDLE
export const HMODULE = HINSTANCE
export const HMONITOR = HANDLE
export const HPALETTE = HANDLE
export const HPEN = HANDLE
export const HRESULT = Def.long
export const HRGN = HANDLE
export const HRSRC = HANDLE
export const HSZ = HANDLE
export const HWINEVENTHOOK = HANDLE
export const HWINSTA = HANDLE
export const HWND = HANDLE
/** A 32-bit signed integer */
export const INT = Def.int
export const INT_PTR = _WIN64 ? Def.int64 : Def.int32
export const INT8 = Def.int8
export const INT16 = Def.int16
export const INT32 = Def.int32
export const INT64 = Def.int64
export const LANGID = WORD
export const LCID = DWORD
export const LCTYPE = DWORD
export const LGRPID = DWORD
export const LONG = Def.long
export const LONGLONG = Def.longlong
export const LONG32 = Def.int32
export const LONG64 = Def.int64
export const LPARAM = LONG_PTR
export const LPBOOL = BOOL
export const LPBYTE = Def.bytePtr
export const LPCOLORREF = DWORD
export const LPCSTR = Def.uint8Ptr
export const LPCWSTR = Def.uint16Ptr
export const LPCTSTR = Def.uint16Ptr
export const LPVOID = Def.voidPtr
export const LPCVOID = LPVOID
export const LPDWORD = Def.uint16Ptr
export const LPHANDLE = _WIN64 ? Def.int64Ptr : Def.int32Ptr
export const LPINT = Def.intPtr
export const LPLONG = Def.int32Ptr
export const LPMSG = Def.ptr
export const LPPOINT = Def.ptr
export const LPSTR = Def.charPtr
export const LPWSTR = Def.uint16Ptr
export const LPTSTR = Def.uint16Ptr
export const LPWORD = Def.uint16Ptr
export const LRESULT = LONG_PTR
export const NTSTATUS = Def.uint32
export const PBOOL = Def.intPtr
export const PBOOLEAN = Def.boolPtr
export const PBYTE = Def.bytePtr
export const PCHAR = Def.charPtr
export const PCSTR = Def.uint8Ptr
export const PCTSTR = _WIN64 ? Def.int16Ptr : Def.int8Ptr
export const PCWSTR = Def.uint16Ptr
export const PDWORD = Def.uint32Ptr
export const PDWORDLONG = Def.uint64Ptr
export const PDWORD_PTR = DWORD_PTR
export const PDWORD32 = Def.uint32Ptr
export const PDWORD64 = Def.uint64Ptr
export const PFLOAT = Def.floatPtr
export const PHALF_PTR = Def.ptr
export const PHANDLE = _WIN64 ? Def.uint64PtrPtr : Def.uint32PtrPtr
export const PHKEY = _WIN64 ? Def.uint64PtrPtr : Def.uint32PtrPtr
export const PINT = Def.intPtr
export const PINT_PTR = Def.intPtrPtr
export const PINT8 = Def.int8Ptr
export const PINT16 = Def.int16Ptr
export const PINT32 = Def.int32Ptr
export const PINT64 = Def.int64Ptr
export const PLCID = Def.uint32Ptr
export const PLONG = Def.longPtr
export const PLONGLONG = Def.int64Ptr
export const PLONG_PTR = Def.ptr
export const PLONG32 = Def.int32Ptr
export const PLONG64 = Def.int64Ptr
// ? A 32-bit pointer. On a 32-bit system, this is a native pointer.
// On a 64-bit system, this is a truncated 64-bit pointer.
export const POINTER_32 = _WIN64 ? Def.int32Ptr : Def.int32Ptr
// ? A 64-bit pointer. On a 64-bit system, this is a native pointer.
// On a 32-bit system, this is a sign-extended 32-bit pointer.
export const POINTER_64 = _WIN64 ? Def.int64Ptr : Def.int32Ptr
export const POINTER_SIGNED = Def.ptr
export const POINTER_UNSIGNED = Def.ptr
export const PSHORT = Def.int16Ptr
export const PSIZE_T = ULONG_PTR
export const PSSIZE_T = Def.ptr
export const PSTR = Def.charPtr
export const PTBYTE = Def.int16Ptr
export const PTCHAR = Def.uint16Ptr
export const PTSTR = Def.uint16Ptr
export const PUCHAR = Def.ptr
export const PUHALF_PTR = Def.ptr
export const PUINT = Def.uintPtr
export const PUINT_PTR = Def.uintPtrPtr
export const PUINT8 = Def.uint8Ptr
export const PUINT16 = Def.uint16Ptr
export const PUINT32 = Def.uint32Ptr
export const PUINT64 = Def.uint64Ptr
export const PULONG = Def.uintPtr
export const PULONGLONG = Def.uint64Ptr
export const PULONG_PTR = Def.uint64PtrPtr
export const PULONG32 = Def.uintPtr
export const PULONG64 = Def.uint64Ptr
export const PUSHORT = Def.uint16Ptr
export const PWCHAR = Def.uint16Ptr
export const PWORD = Def.uint16Ptr
export const PWSTR = Def.uint16Ptr
export const QWORD = Def.uint64
export const SC_HANDLE = HANDLE
export const SC_LOCK = LPVOID
export const SERVICE_STATUS_HANDLE = HANDLE
export const SHORT = Def.int16
export const SIZE_T = ULONG_PTR
export const SSIZE_T = LONG_PTR
export const TBYTE = Def.int16
export const TCHAR = Def.uint16
export const UCHAR = Def.uchar
export const UHALF_PTR = _WIN64 ? Def.uint32 : Def.uint16
export const UINT = Def.uint
export const UINT_PTR = _WIN64 ? Def.uint64 : Def.uint32
export const UINT8 = Def.uint8
export const UINT16 = Def.uint16
export const UINT32 = Def.uint32
export const UINT64 = Def.uint64
export const ULONG = Def.uint
export const ULONGLONG = Def.uint64
export const ULONG32 = Def.uint32
export const ULONG64 = Def.uint64
export const USHORT = Def.ushort
export const USN = LONGLONG
// export const WINAPI;
export const WINEVENTPROC = Def.ptr
export const WNDENUMPROC = Def.ptr
export const WNDPROC = Def.ptr

/**
 * Note: original be typedef UINT_PTR WPARAM;
 * CALLBACK WNDCLASSEX.lpfnWndProc may pass negative number and cause process exit.
 */
export const WPARAM = UINT_PTR
// A pointer to an INITCOMMONCONTROLSEX
export const LPINITCOMMONCONTROLSEX = Def.ptr
export const LPWNDCLASSEX = Def.ptr // A pointer to a WNDCLASSEX
export const PWINDOWINFO = Def.ptr // A pointer to a WINDOWINFO structure

export const PFILETIME = Def.ptr // A pointer to a FILETIME
export const LPFILETIME = Def.ptr // A pointer to a FILETIME

export const va_list = Def.charPtr


