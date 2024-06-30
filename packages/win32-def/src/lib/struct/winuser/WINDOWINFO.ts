import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'
import { RECT_Factory } from '../windef/RECT.js'
import type { RECT_Type } from '../windef/RECT.js'


const key = 'WINDOWINFO'
const ptr = `${key}*` as const
const init: StructInitType = {
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

export const LPWINDOWINFO = ptr
export const WINDOWINFO_Name = key
export const WINDOWINFO_Init: typeof init = init

/**
 * WINDOWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-WINDOWINFO
 */
export function WINDOWINFO_Factory(): StructFactoryResult<WINDOWINFO_Type> {
  return genStruct<WINDOWINFO_Type>(init, key, ptr, ['cbSize'])
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
