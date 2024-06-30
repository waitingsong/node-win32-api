import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'
import { POINT_Factory } from '../windef/POINT.js'
import type { POINT_Type } from '../windef/POINT.js'


const key = 'MSG'
const ptr = `${key}*` as const
const init: StructInitType = {
  hwnd: D.HWND,
  message: D.UINT,
  wParam: D.WPARAM,
  lParam: D.LPARAM,
  time: D.DWORD,
  pt: POINT_Factory,
  lPrivate: D.DWORD,
} as const

export const LPMSG = ptr
export const MSG_Name = key
export const MSG_Init: typeof init = init

/**
 * MSG structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-msg
 */
export function MSG_Factory(): StructFactoryResult<MSG_Type> {
  return genStruct<MSG_Type>(init, key, ptr)
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
