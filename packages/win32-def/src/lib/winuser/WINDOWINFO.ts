import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'
import { RECT_Factory, type RECT_Type } from '../windef/RECT.js'


const key = 'WINDOWINFO'
const ptr = `${key}*`
const init = {
  cbSize: W.DWORD,
  rcWindow: RECT_Factory,
  rcClient: RECT_Factory,
  dwStyle: W.DWORD,
  dwExStyle: W.DWORD,
  dwWindowStatus: W.DWORD,
  cxWindowBorders: W.UINT,
  cyWindowBorders: W.UINT,
  atomWindowType: W.ATOM,
  wCreatorVersion: W.WORD,
} as const


/**
 * WINDOWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-WINDOWINFO
 */
export function WINDOWINFO_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * WINDOWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-WINDOWINFO
 */
export interface WINDOWINFO_Type {
  cbSize: M.DWORD
  rcWindow: RECT_Type
  rcClient: RECT_Type
  dwStyle: M.DWORD
  dwExStyle: M.DWORD
  dwWindowStatus: M.DWORD
  cxWindowBorders: M.UINT
  cyWindowBorders: M.UINT
  atomWindowType: M.ATOM
  wCreatorVersion: M.WORD
}

export const LPWINDOWINFO = ptr
export const WINDOWINFO_Init = init

