import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'

import { RID_DEVICE_INFO_HID_Factory } from './RID_DEVICE_INFO_HID.js'
import type { RID_DEVICE_INFO_HID_Type } from './RID_DEVICE_INFO_HID.js'
import { RID_DEVICE_INFO_KEYBOARD_Factory } from './RID_DEVICE_INFO_KEYBOARD.js'
import type { RID_DEVICE_INFO_KEYBOARD_Type } from './RID_DEVICE_INFO_KEYBOARD.js'
import { RID_DEVICE_INFO_MOUSE_Factory } from './RID_DEVICE_INFO_MOUSE.js'
import type { RID_DEVICE_INFO_MOUSE_Type } from './RID_DEVICE_INFO_MOUSE.js'


const key = 'RID_DEVICE_INFO'
const ptr = `${key}*` as const
const init: StructInitType = {
  cbSize: D.DWORD,
  dwType: D.DWORD,
  u: {
    mouse: RID_DEVICE_INFO_MOUSE_Factory,
    keyboard: RID_DEVICE_INFO_KEYBOARD_Factory,
    hid: RID_DEVICE_INFO_HID_Factory,
  },
} as const

export const LPRID_DEVICE_INFO = ptr
export const RID_DEVICE_INFO_Name = key
export const RID_DEVICE_INFO_Init: typeof init = init

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
