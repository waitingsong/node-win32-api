import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RAWINPUTHEADER'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwType: D.DWORD,
  dwSize: D.DWORD,
  hDevice: D.HANDLE,
  wParam: D.WPARAM,
} as const

export const LPRAWINPUTHEADER = ptr
export const RAWINPUTHEADER_Name = key
export const RAWINPUTHEADER_Init: typeof init = init

/**
 * RAWINPUTHEADER structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTHEADER
 */
export function RAWINPUTHEADER_Factory(): StructFactoryResult<RAWINPUTHEADER_Type> {
  return genStruct<RAWINPUTHEADER_Type>(init, key, ptr)
}

/**
 * RAWINPUTHEADER structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTHEADER
 */
export interface RAWINPUTHEADER_Type {
  dwType: T.DWORD
  dwSize: T.DWORD
  hDevice: T.HANDLE
  wParam: T.WPARAM
}
