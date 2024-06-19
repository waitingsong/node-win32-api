import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


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
export function RAWINPUTDEVICELIST_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
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

