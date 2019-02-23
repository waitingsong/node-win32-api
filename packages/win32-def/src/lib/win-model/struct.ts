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
  VOID,
  WNDPROC,
  WORD,
  WPARAM,
} from './common'

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
export interface InitCommonControlsEXStruct extends StructInstanceBase {
  dwSize: DWORD
  dwICC: DWORD
}

export type MSG = Buffer
export interface MsgStruct extends StructInstanceBase {
  hwnd: HWND
  message: UINT
  wParam: WPARAM
  lParam: LPARAM
  time: DWORD
  pt: POINT
}

export type POINT = Buffer
export interface PointStruct extends StructInstanceBase {
  x: LONG
  y: LONG
}

export type WNDCLASSEX = Buffer
export interface WndClassEXStruct extends StructInstanceBase {
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

export type WINDOWINFO = Buffer
export interface WindowInfoStruct extends StructInstanceBase {
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

export type RECT = Buffer
export interface RectStruct extends StructInstanceBase {
  left: LONG
  top: LONG
  right: LONG
  bottom: LONG
}
