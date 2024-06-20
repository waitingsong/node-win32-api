import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'RID_DEVICE_INFO_KEYBOARD'
const ptr = `${key} *`
const init = {
  dwType: D.DWORD,
  dwSubType: D.DWORD,
  dwKeyboardMode: D.DWORD,
  dwNumberOfFunctionKeys: D.DWORD,
  dwNumberOfIndicators: D.DWORD,
  dwNumberOfKeysTotal: D.DWORD,
} as const


/**
 * RID_DEVICE_INFO_KEYBOARD structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_KEYBOARD
 */
export function RID_DEVICE_INFO_KEYBOARD_Factory(): StructFactoryResult<RID_DEVICE_INFO_KEYBOARD_Type> {
  return genStruct<RID_DEVICE_INFO_KEYBOARD_Type>(init, key, ptr)
}

/**
 * RID_DEVICE_INFO_KEYBOARD structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_KEYBOARD
 */
export interface RID_DEVICE_INFO_KEYBOARD_Type {
  dwType: T.DWORD
  dwSubType: T.DWORD
  dwKeyboardMode: T.DWORD
  dwNumberOfFunctionKeys: T.DWORD
  dwNumberOfIndicators: T.DWORD
  dwNumberOfKeysTotal: T.DWORD
}

export const PRID_DEVICE_INFO_KEYBOARD = ptr
export const RID_DEVICE_INFO_KEYBOARD_Init = init

