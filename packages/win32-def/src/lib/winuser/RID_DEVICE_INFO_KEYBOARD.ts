import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'RID_DEVICE_INFO_KEYBOARD'
const ptr = `${key} *`
const init = {
  dwType: W.DWORD,
  dwSubType: W.DWORD,
  dwKeyboardMode: W.DWORD,
  dwNumberOfFunctionKeys: W.DWORD,
  dwNumberOfIndicators: W.DWORD,
  dwNumberOfKeysTotal: W.DWORD,
} as const


/**
 * RID_DEVICE_INFO_KEYBOARD structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_KEYBOARD
 */
export function RID_DEVICE_INFO_KEYBOARD_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * RID_DEVICE_INFO_KEYBOARD structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_KEYBOARD
 */
export interface RID_DEVICE_INFO_KEYBOARD_Type {
  dwType: M.DWORD
  dwSubType: M.DWORD
  dwKeyboardMode: M.DWORD
  dwNumberOfFunctionKeys: M.DWORD
  dwNumberOfIndicators: M.DWORD
  dwNumberOfKeysTotal: M.DWORD
}

export const PRID_DEVICE_INFO_KEYBOARD = ptr
export const RID_DEVICE_INFO_KEYBOARD_Init = init

