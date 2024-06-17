import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { KoffiTypeResult, genSimpleStruct } from '../helper2.js'


const key = 'RAWINPUTHEADER'
const ptr = `${key}*`
const init = {
  dwType: W.DWORD,
  dwSize: W.DWORD,
  hDevice: W.HANDLE,
  wParam: W.WPARAM,
} as const


/**
 * RAWINPUTHEADER structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTHEADER
 */
export function RAWINPUTHEADER_Factory(): KoffiTypeResult {
  return genSimpleStruct(init, key, ptr)
}

/**
 * RAWINPUTHEADER structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTHEADER
 */
export interface RAWINPUTHEADER_Type {
  dwType: M.DWORD
  dwSize: M.DWORD
  hDevice: M.HANDLE
  wParam: M.WPARAM
}

export const LPRAWINPUTHEADER = ptr
export const RAWINPUTHEADER_Init = init

