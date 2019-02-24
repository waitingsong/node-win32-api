// windows data types struct for ref-struct module https://github.com/TooTallNate/ref-struct

import { parse_windef } from './helper'
import { macroMap } from './marcomap'
import * as windef from './windef'

const W = <typeof windef> parse_windef(windef, macroMap)

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

export const INITCOMMONCONTROLSEX = {
  dwSize: W.DWORD,
  dwICC: W.DWORD,
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

export const MSG = {
  hwnd: W.HWND,
  message: W.UINT,
  wParam: W.WPARAM,
  lParam: W.LPARAM,
  time: W.DWORD,
  pt: W.POINT,
}

// https://msdn.microsoft.com/en-us/library/windows/desktop/dd162805(v=vs.85).aspx
export const POINT = {
  x: W.LONG,
  y: W.LONG,
}

export const PROCESS_BASIC_INFORMATION = {
  Reserved1: W.PVOID,
  PebBaseAddress: W.PVOID,  // PPEB
  Reserved2: W.PVOID,
  UniqueProcessId: W.ULONG_PTR,
  InheritedFromUniqueProcessId: W.PVOID,
}


export const UNICODE_STRING = {
  Length: W.USHORT,
  MaximumLength: W.USHORT,
  Buffer: W.PWSTR,
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

// https://msdn.microsoft.com/zh-cn/library/windows/desktop/ms633577(v=vs.85).aspx
export const WNDCLASSEX = {
  cbSize: W.UINT,
  style: W.UINT,
  // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
  lpfnWndProc: W.WNDPROC,
  cbClsExtra: W.INT,
  cbWndExtra: W.INT,
  hInstance: W.HINSTANCE, // can be 0?
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
