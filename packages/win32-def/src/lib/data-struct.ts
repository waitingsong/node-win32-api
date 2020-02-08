/* eslint-disable id-length */
// windows data types struct for ref-struct module https://github.com/TooTallNate/ref-struct
/**
Complex structure see:
https://github.com/waitingsong/node-win32-api/blob/master/packages/win32-api/src/data-struct-ext/
*/

import { parse_windef } from './helper'
import { macroMap } from './marcomap'
import * as windef from './windef'


const W = parse_windef(windef, macroMap) as typeof windef

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


/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-alttabinfo */
export const ALTTABINFO = {
  cbSize: W.DWORD,
  cItems: W.INT,
  cColumns: W.INT,
  cRows: W.INT,
  iColFocus: W.INT,
  iRowFocus: W.INT,
  cxItem: W.INT,
  cyItem: W.INT,
  ptStart: W.POINT,
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-taghardwareinput */
export const HARDWAREINPUT = {
  uMsg: W.DWORD,
  wParamL: W.WORD,
  wParamH: W.WORD,
}

export const INITCOMMONCONTROLSEX = {
  dwSize: W.DWORD,
  dwICC: W.DWORD,
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagkeybdinput */
export const KEYBDINPUT = {
  wVk: W.WORD,
  wScan: W.WORD,
  dwFlags: W.DWORD,
  time: W.DWORD,
  dwExtraInfo: W.ULONG_PTR,
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagmouseinput */
export const MOUSEINPUT = {
  dx: W.LONG,
  dy: W.LONG,
  mouseData: W.DWORD,
  dwFlags: W.DWORD,
  time: W.DWORD,
  dwExtraInfo: W.ULONG_PTR,
}

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg */
export const MSG = {
  hwnd: W.HWND,
  message: W.UINT,
  wParam: W.WPARAM,
  lParam: W.LPARAM,
  time: W.DWORD,
  pt: W.POINT,
  lPrivate: W.DWORD,
}

// https://msdn.microsoft.com/en-us/library/windows/desktop/dd162805(v=vs.85).aspx
export const POINT = {
  x: W.LONG,
  y: W.LONG,
}

export const PROCESS_BASIC_INFORMATION = {
  Reserved1: W.PVOID,
  PebBaseAddress: W.PVOID, // PPEB
  Reserved2: W.PVOID,
  UniqueProcessId: W.ULONG_PTR,
  InheritedFromUniqueProcessId: W.PVOID,
}


export const UNICODE_STRING = {
  Length: W.USHORT,
  MaximumLength: W.USHORT,
  Buffer: W.PWSTR,
}

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawhid */
export const RAWHID = {
  dwSizeHid: W.DWORD,
  dwCount: W.DWORD,
  /** bRawData[1] */
  bRawData: W.BYTE,
}

/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rawinputdevicelist */
export const RAWINPUTDEVICELIST = {
  hDevice: W.HANDLE,
  dwType: W.DWORD,
}

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawinputheader */
export const RAWINPUTHEADER = {
  dwType: W.DWORD,
  dwSize: W.DWORD,
  hDevice: W.HANDLE,
  wParam: W.WPARAM,
}

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawkeyboard */
export const RAWKEYBOARD = {
  MakeCode: W.USHORT,
  Flags: W.USHORT,
  Reserved: W.USHORT,
  VKey: W.USHORT,
  Message: W.UINT,
  ExtraInformation: W.ULONG,
}

export const WINDOWINFO = {
  cbSize: W.DWORD,
  rcWindow: W.RECT,
  rcClient: W.RECT,
  dwStyle: W.DWORD,
  dwExStyle: W.DWORD,
  dwWindowStatus: W.DWORD,
  cxWindowBorders: W.UINT,
  cyWindowBorders: W.UINT,
  atomWindowType: W.ATOM,
  wCreatorVersion: W.WORD,
}

/** https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms633577(v=vs.85).aspx */
export const WNDCLASSEX = {
  cbSize: W.UINT,
  style: W.UINT,
  // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
  lpfnWndProc: W.WNDPROC,
  cbClsExtra: W.INT,
  cbWndExtra: W.INT,
  hInstance: W.HINSTANCE,
  hIcon: W.HICON,
  hCursor: W.HCURSOR,
  hbrBackground: W.HBRUSH,
  lpszMenuName: W.LPCTSTR,
  lpszClassName: W.LPCTSTR,
  hIconSm: W.HICON,
}

export const RECT = {
  left: W.LONG,
  top: W.LONG,
  right: W.LONG,
  bottom: W.LONG,
}
export { RECT as _RECT }

/** https://docs.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime */
export const FILETIME = {
  dwLowDateTime: W.DWORD,
  dwHighDateTime: W.DWORD,
}

