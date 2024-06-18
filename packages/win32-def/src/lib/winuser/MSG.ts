import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'
import { POINT_Factory, type POINT_Type } from '../windef/POINT.js'


const key = 'MSG'
const ptr = `${key} *`
const init = {
  hwnd: W.HWND,
  message: W.UINT,
  wParam: W.WPARAM,
  lParam: W.LPARAM,
  time: W.DWORD,
  pt: POINT_Factory,
  lPrivate: W.DWORD,
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
  hwnd: M.HWND
  message: M.UINT
  wParam: M.WPARAM
  lParam: M.LPARAM
  time: M.DWORD
  pt: POINT_Type
  lPrivate: M.DWORD
}

export const LPMSG = ptr
export const MSG_Init = init

