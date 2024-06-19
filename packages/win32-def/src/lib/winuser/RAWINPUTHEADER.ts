import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


const key = 'RAWINPUTHEADER'
const ptr = `${key} *`
const init = {
  dwType: D.DWORD,
  dwSize: D.DWORD,
  hDevice: D.HANDLE,
  wParam: D.WPARAM,
} as const


/**
 * RAWINPUTHEADER structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWINPUTHEADER
 */
export function RAWINPUTHEADER_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
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

export const LPRAWINPUTHEADER = ptr
export const RAWINPUTHEADER_Init = init

