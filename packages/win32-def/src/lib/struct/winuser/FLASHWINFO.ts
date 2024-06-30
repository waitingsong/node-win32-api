import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'FLASHWINFO'
const ptr = `${key}*` as const
const init: StructInitType = {
  cbSize: D.UINT,
  hwnd: D.HWND,
  dwFlags: D.DWORD,
  uCount: D.UINT,
  dwTimeout: D.DWORD,
} as const

export const PFLASHWINFO = ptr
export const FLASHWINFO_Name = key
export const FLASHWINFO_Init: typeof init = init

/**
 * FLASHWINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-FLASHWINFO
 */
export function FLASHWINFO_Factory(): StructFactoryResult<FLASHWINFO_Type> {
  return genStruct<FLASHWINFO_Type>(init, key, ptr, ['cbSize'])
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
