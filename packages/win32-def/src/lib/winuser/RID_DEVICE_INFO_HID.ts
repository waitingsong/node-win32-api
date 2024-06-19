import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


const key = 'RID_DEVICE_INFO_HID'
const ptr = `${key} *`
const init = {
  dwVendorId: D.DWORD,
  dwProductId: D.DWORD,
  dwVersionNumber: D.DWORD,
  usUsagePage: D.USHORT,
  usUsage: D.USHORT,
} as const


/**
 * RID_DEVICE_INFO_HID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_HID
 */
export function RID_DEVICE_INFO_HID_Factory(): StructFactoryResult<RID_DEVICE_INFO_HID_Type> {
  return genStruct<RID_DEVICE_INFO_HID_Type>(init, key, ptr)
}

/**
 * RID_DEVICE_INFO_HID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_HID
 */
export interface RID_DEVICE_INFO_HID_Type {
  dwVendorId: T.DWORD
  dwProductId: T.DWORD
  dwVersionNumber: T.DWORD
  usUsagePage: T.USHORT
  usUsage: T.USHORT
}

export const PRID_DEVICE_INFO_HID = ptr
export const RID_DEVICE_INFO_HID_Init = init

