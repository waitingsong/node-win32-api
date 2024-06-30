import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RAWINPUTDEVICELIST'
const ptr = `${key}*` as const
const init: StructInitType = {
  hDevice: D.HANDLE,
  dwType: D.DWORD,
} as const

export const LPRAWINPUTDEVICELIST = ptr
export const RAWINPUTDEVICELIST_Name = key
export const RAWINPUTDEVICELIST_Init: typeof init = init

/**
 * RAWINPUTDEVICELIST structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTDEVICELIST
 */
export function RAWINPUTDEVICELIST_Factory(): StructFactoryResult<RAWINPUTDEVICELIST_Type> {
  return genStruct<RAWINPUTDEVICELIST_Type>(init, key, ptr)
}

/**
 * RAWINPUTDEVICELIST structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTDEVICELIST
 */
export interface RAWINPUTDEVICELIST_Type {
  hDevice: T.HANDLE
  dwType: T.DWORD
}
