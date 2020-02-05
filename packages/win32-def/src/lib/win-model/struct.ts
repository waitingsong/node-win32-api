/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/class-name-casing */
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
  UINT,
  ULONG,
  ULONG_PTR,
  USHORT,
  VOID,
  WCHAR_String,
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


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export type DISPLAY_DEVICEW = Buffer
export type PDISPLAY_DEVICEW = DISPLAY_DEVICEW
export type LPDISPLAY_DEVICEW = DISPLAY_DEVICEW
export interface DISPLAY_DEVICEW_Struct extends StructInstanceBase {
  cb: DWORD
  DeviceName: WCHAR_String
  DeviceString: WCHAR_String
  StateFlags: DWORD
  DeviceID: WCHAR_String
  DeviceKey: WCHAR_String
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-taghardwareinput */
export type HARDWAREINPUT = Buffer
export interface HARDWAREINPUT_Struct extends StructInstanceBase {
  uMsg: DWORD
  wParamL: WORD
  wParamH: WORD
}

export type INITCOMMONCONTROLSEX = Buffer
export interface INITCOMMONCONTROLSEX_Struct extends StructInstanceBase {
  dwSize: DWORD
  dwICC: DWORD
}
/**
 * @deprecated using INITCOMMONCONTROLSEX_Struct
 */
// export type InitCommonControlsEXStruct = INITCOMMONCONTROLSEX_Struct

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

/** https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg */
export type MSG = Buffer
export interface MSG_Struct extends StructInstanceBase {
  hwnd: HWND
  message: UINT
  wParam: WPARAM
  lParam: LPARAM
  time: DWORD
  pt: POINT
  lPrivate: DWORD
}
/**
 * @deprecated using MSG_Struct
 */
// export type MsgStruct = MSG_Struct

export type POINT = Buffer
export interface POINT_Struct extends StructInstanceBase {
  x: LONG
  y: LONG
}
/**
 * @deprecated using POINT_Struct
 */
// export type PointStruct = POINT_Struct

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagrawhid */
export type RAWHID = Buffer
export interface RAWHID_Struct extends StructInstanceBase {
  dwSizeHid: DWORD
  dwCount: DWORD
  /** bRawData[1] */
  bRawData: BYTE
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagrawinputheader */
export type RAWINPUTHEADER = Buffer
export interface RAWINPUTHEADER_Struct extends StructInstanceBase {
  dwType: DWORD
  dwSize: DWORD
  hDevice: HANDLE
  wParam: WPARAM
}

/** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/ns-winuser-tagrawkeyboard */
export type RAWKEYBOARD = Buffer
export interface RAWKEYBOARD_Struct extends StructInstanceBase {
  MakeCode: USHORT
  Flags: USHORT
  Reserved: USHORT
  VKey: USHORT
  Message: UINT
  ExtraInformation: ULONG
}

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
/**
 * @deprecated using WNDClASSEX_Struct
 */
// export type WndClassEXStruct = WNDClASSEX_Struct

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
/**
 * @deprecated using
 */
// export type WindowInfoStruct = WINDOWINFO_Struct

export type RECT = Buffer
export interface RECT_Struct extends StructInstanceBase {
  left: LONG
  top: LONG
  right: LONG
  bottom: LONG
}
/**
 * @deprecated using
 */
// export type RectStruct = RECT_Struct

export type FILETIME = Buffer
export interface FILETIME_Struct extends StructInstanceBase {
  dwLowDateTime: DWORD
  dwHighDateTime: DWORD
}

