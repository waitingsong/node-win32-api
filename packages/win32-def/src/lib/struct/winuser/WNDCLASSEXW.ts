import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'WNDCLASSEXW'
const ptr = `${key}*` as const
const init: StructInitType = {
  cbSize: D.UINT,
  style: D.UINT,
  lpfnWndProc: D.WNDPROC,
  cbClsExtra: D.INT,
  cbWndExtra: D.INT,
  hInstance: D.HINSTANCE,
  hIcon: D.HICON,
  hCursor: D.HCURSOR,
  hbrBackground: D.HBRUSH,
  lpszMenuName: D.WString,
  lpszClassName: D.WString,
  hIconSm: D.HICON,
} as const

export const LPWNDCLASSEXW = ptr
export const WNDCLASSEXW_Name = key
export const WNDCLASSEXW_Init: typeof init = init

/**
 * WNDCLASSEXW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export function WNDCLASSEXW_Factory(): StructFactoryResult<WNDCLASSEXW_Type> {
  return genStruct<WNDCLASSEXW_Type>(init, key, ptr, ['cbSize'])
}

/**
 * WNDCLASSEXW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export interface WNDCLASSEXW_Type {
  cbSize: T.UINT
  style: T.UINT
  lpfnWndProc: T.WNDPROC
  cbClsExtra: T.INT
  cbWndExtra: T.INT
  hInstance: T.HINSTANCE
  hIcon: T.HICON
  hCursor: T.HCURSOR
  hbrBackground: T.HBRUSH
  lpszMenuName: T.WCHAR_String
  lpszClassName: T.WCHAR_String
  hIconSm: T.HICON
}
