import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


const key = 'RID_DEVICE_INFO_MOUSE'
const ptr = `${key} *`
const init = {
  dwId: W.DWORD,
  dwNumberOfButtons: W.DWORD,
  dwSampleRate: W.DWORD,
  fHasHorizontalWheel: W.BOOL,
} as const


/**
 * RID_DEVICE_INFO_MOUSE structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_MOUSE
 */
export function RID_DEVICE_INFO_MOUSE_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * RID_DEVICE_INFO_MOUSE structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_MOUSE
 */
export interface RID_DEVICE_INFO_MOUSE_Type {
  dwId: M.DWORD
  dwNumberOfButtons: M.DWORD
  dwSampleRate: M.DWORD
  fHasHorizontalWheel: M.BOOL
}

export const PRID_DEVICE_INFO_MOUSE = ptr
export const RID_DEVICE_INFO_MOUSE_Init = init

