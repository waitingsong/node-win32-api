import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


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

export const LPRAWINPUTHEADER = ptr
export const RAWINPUTHEADER_Init = init
