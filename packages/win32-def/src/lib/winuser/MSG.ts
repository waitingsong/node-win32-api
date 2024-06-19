import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'
import { POINT_Factory, type POINT_Type } from '../windef/POINT.js'


const key = 'MSG'
const ptr = `${key} *`
const init = {
  hwnd: D.HWND,
  message: D.UINT,
  wParam: D.WPARAM,
  lParam: D.LPARAM,
  time: D.DWORD,
  pt: POINT_Factory,
  lPrivate: D.DWORD,
} as const


/**
 * MSG structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg
 */
export function MSG_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * MSG structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg
 */
export interface MSG_Type {
  hwnd: T.HWND
  message: T.UINT
  wParam: T.WPARAM
  lParam: T.LPARAM
  time: T.DWORD
  pt: POINT_Type
  lPrivate: T.DWORD
}

export const LPMSG = ptr
export const MSG_Init = init

