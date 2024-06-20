import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'

import { RID_DEVICE_INFO_HID_Factory, type RID_DEVICE_INFO_HID_Type } from './RID_DEVICE_INFO_HID.js'
import { RID_DEVICE_INFO_KEYBOARD_Factory, type RID_DEVICE_INFO_KEYBOARD_Type } from './RID_DEVICE_INFO_KEYBOARD.js'
import { RID_DEVICE_INFO_MOUSE_Factory, type RID_DEVICE_INFO_MOUSE_Type } from './RID_DEVICE_INFO_MOUSE.js'


const key = 'RID_DEVICE_INFO'
const ptr = `${key} *`
const init = {
  cbSize: D.DWORD,
  dwType: D.DWORD,
  u: {
    mouse: RID_DEVICE_INFO_MOUSE_Factory,
    keyboard: RID_DEVICE_INFO_KEYBOARD_Factory,
    hid: RID_DEVICE_INFO_HID_Factory,
  },
} as const


/**
 * RID_DEVICE_INFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO
 */
export function RID_DEVICE_INFO_Factory(): StructFactoryResult<RID_DEVICE_INFO_Type> {
  return genStruct<RID_DEVICE_INFO_Type>(init, key, ptr, ['cbSize'])
}

/**
 * RID_DEVICE_INFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO
 */
export interface RID_DEVICE_INFO_Type {
  cbSize: T.DWORD
  dwType: T.DWORD
  u: {
    mouse: RID_DEVICE_INFO_MOUSE_Type,
    keyboard: RID_DEVICE_INFO_KEYBOARD_Type,
    hid: RID_DEVICE_INFO_HID_Type,
  }
}

export const LPRID_DEVICE_INFO = ptr
export const RID_DEVICE_INFO_Init = init

