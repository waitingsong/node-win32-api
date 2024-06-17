import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'WNDCLASSEXW'
const ptr = `${key}*`
const init = {
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
} as const


/**
 * WNDCLASSEXW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export function WNDCLASSEXW_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * WNDCLASSEXW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-wndclassexw
 */
export interface WNDCLASSEXW_Type {
  cbSize: M.UINT
  style: M.UINT
  // 'lpfnWndProc': ffi.Function('int32', ['pointer', 'uint32', 'int32', 'uint32']) ,
  lpfnWndProc: M.WNDPROC
  cbClsExtra: M.INT
  cbWndExtra: M.INT
  hInstance: M.HINSTANCE
  hIcon: M.HICON
  hCursor: M.HCURSOR
  hbrBackground: M.HBRUSH
  lpszMenuName: M.LPCTSTR
  lpszClassName: M.LPCTSTR
  hIconSm: M.HICON
}

export const LPWNDCLASSEXW = ptr
export const WNDCLASSEXW_Init = init

