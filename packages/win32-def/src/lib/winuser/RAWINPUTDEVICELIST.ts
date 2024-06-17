import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { KoffiTypeResult, genSimpleStruct } from '../helper2.js'


const key = 'RAWINPUTDEVICELIST'
const ptr = `${key}*`
const init = {
  hDevice: W.HANDLE,
  dwType: W.DWORD,
} as const


/**
 * RAWINPUTDEVICELIST structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTDEVICELIST
 */
export function RAWINPUTDEVICELIST_Factory(): KoffiTypeResult {
  return genSimpleStruct(init, key, ptr)
}

/**
 * RAWINPUTDEVICELIST structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTDEVICELIST
 */
export interface RAWINPUTDEVICELIST_Type {
  hDevice: M.HANDLE
  dwType: M.DWORD
}

export const LPRAWINPUTDEVICELIST = ptr
export const RAWINPUTDEVICELIST_Init = init

