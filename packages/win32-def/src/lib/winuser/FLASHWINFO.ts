import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'FLASHWINFO'
const ptr = `${key} *`
const init = {
  cbSize: W.UINT,
  hwnd: W.HWND,
  dwFlags: W.DWORD,
  uCount: W.UINT,
  dwTimeout: W.DWORD,
} as const


/**
 * FLASHWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-FLASHWINFO
 */
export function FLASHWINFO_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * FLASHWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-FLASHWINFO
 */
export interface FLASHWINFO_Type {
  cbSize: M.UINT
  hwnd: M.HWND
  dwFlags: M.DWORD
  uCount: M.UINT
  dwTimeout: M.DWORD
}

export const PFLASHWINFO = ptr
export const FLASHWINFO_Init = init

