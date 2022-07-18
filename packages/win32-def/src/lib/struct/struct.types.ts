import {
  ATOM,
  BYTE,
  DWORD,
  HANDLE,
  HBRUSH,
  HCURSOR,
  HICON,
  HINSTANCE,
  HWND,
  INT,
  LONG,
  LPARAM,
  LPCTSTR,
  _POINTER,
  PVOID,
  PWSTR,
  UINT,
  ULONG,
  ULONG_PTR,
  USHORT,
  VOID,
  WNDPROC,
  WORD,
  WPARAM,
  StructInstanceBase,
} from '../common.types.js'


/**
 * Struct usage:
 *
 * import * as Struct from 'ref-struct-napi';
 * import { DStruct as DS, DModel as M } from 'win32-api';
 *
 * const point: M.PointStruct = new Struct(DS.POINT)();
 * point.x = 100;
 * point.y = 200;
 * // const buf = point.ref()
 *
 */


/** https://msdn.microsoft.com/en-us/library/windows/desktop/dd162805(v=vs.85).aspx */
export interface POINT extends StructInstanceBase {
  x: LONG
  y: LONG
}

/**
 * @link https://docs.microsoft.com/en-us/windows/win32/api/windef/ns-windef-pointl
 */
export interface POINTL extends StructInstanceBase {
  x: LONG
  y: LONG
}
export type PPOINTL = _POINTER

/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-alttabinfo */
export interface ALTTABINFO extends StructInstanceBase {
  cbSize: DWORD
  cItems: INT
  cColumns: INT
  cRows: INT
  iColFocus: INT
  iRowFocus: INT
  cxItem: INT
  cyItem: INT
  ptStart: POINT
}
export type PALTTABINFO = _POINTER

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-copydatastruct */
export interface COPYDATASTRUCT extends StructInstanceBase {
  dwData: ULONG_PTR
  cbData: DWORD
  lpData: PVOID
}
export type PCOPYDATASTRUCT = _POINTER


/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-taghardwareinput */
export interface HARDWAREINPUT extends StructInstanceBase {
  uMsg: DWORD
  wParamL: WORD
  wParamH: WORD
}
export type PHARDWAREINPUT = _POINTER

export interface INITCOMMONCONTROLSEX extends StructInstanceBase {
  dwSize: DWORD
  dwICC: DWORD
}
/** A pointer to an INITCOMMONCONTROLSEX */
export type LPINITCOMMONCONTROLSEX = _POINTER


/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagkeybdinput */
export interface KEYBDINPUT extends StructInstanceBase {
  wVk: WORD
  wScan: WORD
  dwFlags: DWORD
  time: DWORD
  dwExtraInfo: ULONG_PTR
}
export type PKEYBDINPUT = _POINTER

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagmouseinput */
export interface MOUSEINPUT extends StructInstanceBase {
  dx: LONG
  dy: LONG
  mouseData: DWORD
  dwFlags: DWORD
  time: DWORD
  dwExtraInfo: ULONG_PTR
}
export type PMOUSEINPUT = _POINTER

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg */
export interface MSG extends StructInstanceBase {
  hwnd: HWND
  message: UINT
  wParam: WPARAM
  lParam: LPARAM
  time: DWORD
  pt: POINT
  lPrivate: DWORD
}
export type PMSG = _POINTER


export interface PROCESS_BASIC_INFORMATION extends StructInstanceBase {
  Reserved1: PVOID
  PebBaseAddress: PVOID // PPEB
  Reserved2: PVOID
  UniqueProcessId: ULONG_PTR
  InheritedFromUniqueProcessId: PVOID
}
export type PPROCESS_BASIC_INFORMATION = _POINTER


export interface UNICODE_STRING extends StructInstanceBase {
  Length: USHORT
  MaximumLength: USHORT
  Buffer: PWSTR
}
export type PUNICODE_STRING = _POINTER


/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagrawhid */
export interface RAWHID extends StructInstanceBase {
  dwSizeHid: DWORD
  dwCount: DWORD
  /** bRawData[1] */
  bRawData: BYTE
}
export type PRAWHID = _POINTER

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawinputdevicelist */
export interface RAWINPUTDEVICELIST extends StructInstanceBase {
  hDevice: HANDLE
  dwType: DWORD
}
export type PRAWINPUTDEVICELIST = _POINTER

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagrawinputheader */
export interface RAWINPUTHEADER extends StructInstanceBase {
  dwType: DWORD
  dwSize: DWORD
  hDevice: HANDLE
  wParam: WPARAM
}
export type PRAWINPUTHEADER = _POINTER

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagrawkeyboard */
export interface RAWKEYBOARD extends StructInstanceBase {
  MakeCode: USHORT
  Flags: USHORT
  Reserved: USHORT
  VKey: USHORT
  Message: UINT
  ExtraInformation: ULONG
}
export type PRAWKEYBOARD = _POINTER


/** https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms633577(v=vs.85).aspx */
export interface WNDCLASSEX extends StructInstanceBase {
  cbSize: UINT
  style: UINT
  lpfnWndProc: WNDPROC
  cbClsExtra: INT
  cbWndExtra: INT
  /** can be 0? */
  hInstance: HINSTANCE
  hIcon: HICON
  hCursor: HCURSOR
  hbrBackground: HBRUSH
  lpszMenuName: LPCTSTR
  lpszClassName: LPCTSTR
  hIconSm: HICON
}
/** A pointer to a WNDCLASSEX */
export type LPWNDCLASSEX = _POINTER


export interface RECT extends StructInstanceBase {
  left: LONG
  top: LONG
  right: LONG
  bottom: LONG
}
export type LPRECT = _POINTER


export interface WINDOWINFO extends StructInstanceBase {
  cbSize: DWORD
  rcWindow: VOID
  rcClient: VOID
  dwStyle: DWORD
  dwExStyle: DWORD
  dwWindowStatus: DWORD
  cxWindowBorders: UINT
  cyWindowBorders: UINT
  atomWindowType: ATOM
  wCreatorVersion: WORD
}
/** A pointer to a WINDOWINFO structure */
export type PWINDOWINFO = _POINTER

/** https://docs.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime */
export interface FILETIME extends StructInstanceBase {
  dwLowDateTime: DWORD
  dwHighDateTime: DWORD
}
/** A pointer to a FILETIME */
export type PFILETIME = _POINTER
/** A pointer to a FILETIME */
export type LPFILETIME = _POINTER

