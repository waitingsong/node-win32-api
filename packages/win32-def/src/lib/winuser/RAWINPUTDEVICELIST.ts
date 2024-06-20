import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'RAWINPUTDEVICELIST'
const ptr = `${key} *`
const init = {
  hDevice: D.HANDLE,
  dwType: D.DWORD,
} as const


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

export const LPRAWINPUTDEVICELIST = ptr
export const RAWINPUTDEVICELIST_Init = init

