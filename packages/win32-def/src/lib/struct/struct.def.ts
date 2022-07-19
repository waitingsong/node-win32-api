/* eslint-disable id-length */
// windows data types struct for ref-struct module https://github.com/TooTallNate/ref-struct
/**
 * Complex structure see:
 * https://github.com/waitingsong/node-win32-api/blob/master/packages/win32-api/src/data-struct-ext/
*/

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
  PVOID,
  PWSTR,
  UINT,
  ULONG,
  ULONG_PTR,
  USHORT,
  WNDPROC,
  WORD,
  WPARAM,
} from '../common.def.js'
import { StructType } from '../helper.js'


/**
 * Struct usage:
 *
 * import * as Struct from 'ref-struct';
 * import { DStruct as DS, DModel as M } from 'win32-api';
 *
 * const point: M.PointStruct = new Struct(DS.POINT)();
 * point.x = 100;
 * point.y = 200;
 * // const buf = point.ref()
 *
 */

/** https://msdn.microsoft.com/en-us/library/windows/desktop/dd162805(v=vs.85).aspx */
export const POINT = {
  x: LONG,
  y: LONG,
} as const

/**
 * @link https://docs.microsoft.com/en-us/windows/win32/api/windef/ns-windef-pointl
 */
export const POINTL = {
  x: LONG,
  y: LONG,
} as const

/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-alttabinfo */
export const ALTTABINFO = {
  cbSize: DWORD,
  cItems: INT,
  cColumns: INT,
  cRows: INT,
  iColFocus: INT,
  iRowFocus: INT,
  cxItem: INT,
  cyItem: INT,
  ptStart: StructType(POINT),
} as const

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-copydatastruct */
export const COPYDATASTRUCT = {
  dwData: ULONG_PTR,
  cbData: DWORD,
  lpData: PVOID,
} as const


/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-taghardwareinput */
export const HARDWAREINPUT = {
  uMsg: DWORD,
  wParamL: WORD,
  wParamH: WORD,
} as const

export const INITCOMMONCONTROLSEX = {
  dwSize: DWORD,
  dwICC: DWORD,
} as const

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagkeybdinput */
export const KEYBDINPUT = {
  wVk: WORD,
  wScan: WORD,
  dwFlags: DWORD,
  time: DWORD,
  dwExtraInfo: ULONG_PTR,
} as const

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagmouseinput */
export const MOUSEINPUT = {
  dx: LONG,
  dy: LONG,
  mouseData: DWORD,
  dwFlags: DWORD,
  time: DWORD,
  dwExtraInfo: ULONG_PTR,
} as const

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg */
export const MSG = {
  hwnd: HWND,
  message: UINT,
  wParam: WPARAM,
  lParam: LPARAM,
  time: DWORD,
  pt: StructType(POINT),
  lPrivate: DWORD,
} as const


export const PROCESS_BASIC_INFORMATION = {
  Reserved1: PVOID,
  PebBaseAddress: PVOID, // PPEB
  Reserved2: PVOID,
  UniqueProcessId: ULONG_PTR,
  InheritedFromUniqueProcessId: PVOID,
} as const


export const UNICODE_STRING = {
  Length: USHORT,
  MaximumLength: USHORT,
  Buffer: PWSTR,
} as const

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawhid */
export const RAWHID = {
  dwSizeHid: DWORD,
  dwCount: DWORD,
  /** bRawData[1] */
  bRawData: BYTE,
} as const

/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rawinputdevicelist */
export const RAWINPUTDEVICELIST = {
  hDevice: HANDLE,
  dwType: DWORD,
} as const

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawinputheader */
export const RAWINPUTHEADER = {
  dwType: DWORD,
  dwSize: DWORD,
  hDevice: HANDLE,
  wParam: WPARAM,
} as const

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawkeyboard */
export const RAWKEYBOARD = {
  MakeCode: USHORT,
  Flags: USHORT,
  Reserved: USHORT,
  VKey: USHORT,
  Message: UINT,
  ExtraInformation: ULONG,
} as const


/** https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms633577(v=vs.85).aspx */
export const WNDCLASSEX = {
  cbSize: UINT,
  style: UINT,
  // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
  lpfnWndProc: WNDPROC,
  cbClsExtra: INT,
  cbWndExtra: INT,
  hInstance: HINSTANCE,
  hIcon: HICON,
  hCursor: HCURSOR,
  hbrBackground: HBRUSH,
  lpszMenuName: LPCTSTR,
  lpszClassName: LPCTSTR,
  hIconSm: HICON,
} as const

export const RECT = {
  left: LONG,
  top: LONG,
  right: LONG,
  bottom: LONG,
} as const

export const WINDOWINFO = {
  cbSize: DWORD,
  rcWindow: RECT,
  rcClient: RECT,
  dwStyle: DWORD,
  dwExStyle: DWORD,
  dwWindowStatus: DWORD,
  cxWindowBorders: UINT,
  cyWindowBorders: UINT,
  atomWindowType: ATOM,
  wCreatorVersion: WORD,
} as const

/** https://docs.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime */
export const FILETIME = {
  dwLowDateTime: DWORD,
  dwHighDateTime: DWORD,
} as const

