import * as D from '##/index.def.js'
import { DllFuncs } from '##/index.js'
import * as T from '##/index.js'
import { POINT_Type, LPPOINT } from '##/index.struct.js'


export const apiDef: DllFuncs<Win32Fns> = {
  GetCursorPos: [D.BOOL, [`_Out_ ${LPPOINT}`]],
  FindWindowExW: [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]],
}

export interface Win32Fns {
  GetCursorPos: (lpPoint: POINT_Type) => T.BOOL
  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND
}

