import {
  ATOM,
  DWORD,
  HBRUSH,
  HCURSOR,
  HICON,
  HINSTANCE,
  HWND,
  INT,
  LONG,
  LPARAM,
  LPCTSTR,
  UINT,
  ULONG_PTR,
  VOID,
  WNDPROC,
  WORD,
  WPARAM,
} from './common'

// tslint:disable:class-name

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

export interface StructInstanceBase {
  ref(): Buffer
}

export type INITCOMMONCONTROLSEX = Buffer
export interface INITCOMMONCONTROLSEX_Struct extends StructInstanceBase {
  dwSize: DWORD
  dwICC: DWORD
}
export { INITCOMMONCONTROLSEX_Struct as InitCommonControlsEXStruct }

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagkeybdinput */
export type KEYBDINPUT = Buffer
export interface KEYBDINPUT_Struct extends StructInstanceBase {
  wVk: WORD
  wScan: WORD
  dwFlags: DWORD
  time: DWORD
  dwExtraInfo: ULONG_PTR
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagmouseinput */
export type MOUSEINPUT = Buffer
export interface MOUSEINPUT_Struct extends StructInstanceBase {
  dx: LONG
  dy: LONG
  mouseData: DWORD
  dwFlags: DWORD
  time: DWORD
  dwExtraInfo: ULONG_PTR
}

export type MSG = Buffer
export interface MSG_Struct extends StructInstanceBase {
  hwnd: HWND
  message: UINT
  wParam: WPARAM
  lParam: LPARAM
  time: DWORD
  pt: POINT
}
export { MSG_Struct as MsgStruct }

export type POINT = Buffer
export interface POINT_Struct extends StructInstanceBase {
  x: LONG
  y: LONG
}
export { POINT_Struct as PointStruct }

export type WNDCLASSEX = Buffer
export interface WNDClASSEX_Struct extends StructInstanceBase {
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
export { WNDClASSEX_Struct as WndClassEXStruct }

export type WINDOWINFO = Buffer
export interface WINDOWINFO_Struct extends StructInstanceBase {
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
export { WINDOWINFO_Struct as WindowInfoStruct }

export type RECT = Buffer
export interface RECT_Struct extends StructInstanceBase {
  left: LONG
  top: LONG
  right: LONG
  bottom: LONG
}
export { RECT_Struct as RectStruct }
