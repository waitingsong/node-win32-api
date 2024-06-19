import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


const key = 'WNDCLASSEXW'
const ptr = `${key} *`
const init = {
  cbSize: D.UINT,
  style: D.UINT,
  // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
  lpfnWndProc: D.WNDPROC,
  cbClsExtra: D.INT,
  cbWndExtra: D.INT,
  hInstance: D.HINSTANCE,
  hIcon: D.HICON,
  hCursor: D.HCURSOR,
  hbrBackground: D.HBRUSH,
  lpszMenuName: D.LPCTSTR,
  lpszClassName: D.LPCTSTR,
  hIconSm: D.HICON,
} as const


/**
 * WNDCLASSEXW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export function WNDCLASSEXW_Factory(): StructFactoryResult<WNDCLASSEXW_Type> {
  return genStruct<WNDCLASSEXW_Type>(init, key, ptr)
}

/**
 * WNDCLASSEXW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export interface WNDCLASSEXW_Type {
  cbSize: T.UINT
  style: T.UINT
  // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
  lpfnWndProc: T.WNDPROC
  cbClsExtra: T.INT
  cbWndExtra: T.INT
  hInstance: T.HINSTANCE
  hIcon: T.HICON
  hCursor: T.HCURSOR
  hbrBackground: T.HBRUSH
  lpszMenuName: T.LPCTSTR
  lpszClassName: T.LPCTSTR
  hIconSm: T.HICON
}

export const LPWNDCLASSEXW = ptr
export const WNDCLASSEXW_Init = init

