import * as D from '##/index.def.js'
import { FuncDefList } from '##/index.js'
import * as T from '##/index.js'
import { POINT_Type, LPPOINT, LPDISPLAY_DEVICEW, DISPLAY_DEVICEW_Type } from '##/index.struct.js'


export interface Win32Fns {
  GetCursorPos: (lpPoint: POINT_Type) => T.BOOL
  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND
  EnumDisplayDevicesW: (
    lpDevice: T.LPCWSTR | null,
    iDevNum: T.DWORD,
    lpDisplayDevice: DISPLAY_DEVICEW_Type,
    dwFlags: T.DWORD,
  ) => T.BOOL
}

export const apiDef: FuncDefList<Win32Fns> = {
  GetCursorPos: [D.BOOL, [`_Out_ ${LPPOINT}`]],
  FindWindowExW: [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]],
  EnumDisplayDevicesW: [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${LPDISPLAY_DEVICEW}`, D.DWORD]],
}

