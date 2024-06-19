import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'
import { RECT_Factory, type RECT_Type } from '../windef/RECT.js'


const key = 'WINDOWINFO'
const ptr = `${key} *`
const init = {
  cbSize: D.DWORD,
  rcWindow: RECT_Factory,
  rcClient: RECT_Factory,
  dwStyle: D.DWORD,
  dwExStyle: D.DWORD,
  dwWindowStatus: D.DWORD,
  cxWindowBorders: D.UINT,
  cyWindowBorders: D.UINT,
  atomWindowType: D.ATOM,
  wCreatorVersion: D.WORD,
} as const


/**
 * WINDOWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-WINDOWINFO
 */
export function WINDOWINFO_Factory(): StructFactoryResult {
  return genStruct(init, key, ptr)
}

/**
 * WINDOWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-WINDOWINFO
 */
export interface WINDOWINFO_Type {
  cbSize: T.DWORD
  rcWindow: RECT_Type
  rcClient: RECT_Type
  dwStyle: T.DWORD
  dwExStyle: T.DWORD
  dwWindowStatus: T.DWORD
  cxWindowBorders: T.UINT
  cyWindowBorders: T.UINT
  atomWindowType: T.ATOM
  wCreatorVersion: T.WORD
}

export const LPWINDOWINFO = ptr
export const WINDOWINFO_Init = init

