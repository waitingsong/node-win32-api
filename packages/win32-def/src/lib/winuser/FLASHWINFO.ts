import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


const key = 'FLASHWINFO'
const ptr = `${key} *`
const init = {
  cbSize: D.UINT,
  hwnd: D.HWND,
  dwFlags: D.DWORD,
  uCount: D.UINT,
  dwTimeout: D.DWORD,
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
  cbSize: T.UINT
  hwnd: T.HWND
  dwFlags: T.DWORD
  uCount: T.UINT
  dwTimeout: T.DWORD
}

export const PFLASHWINFO = ptr
export const FLASHWINFO_Init = init

