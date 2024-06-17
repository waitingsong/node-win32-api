import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'RID_DEVICE_INFO_HID'
const ptr = `${key}*`
const init = {
  dwVendorId: W.DWORD,
  dwProductId: W.DWORD,
  dwVersionNumber: W.DWORD,
  usUsagePage: W.USHORT,
  usUsage: W.USHORT,
} as const


/**
 * RID_DEVICE_INFO_HID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_HID
 */
export function RID_DEVICE_INFO_HID_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * RID_DEVICE_INFO_HID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_HID
 */
export interface RID_DEVICE_INFO_HID_Type {
  dwVendorId: M.DWORD
  dwProductId: M.DWORD
  dwVersionNumber: M.DWORD
  usUsagePage: M.USHORT
  usUsage: M.USHORT
}

export const PRID_DEVICE_INFO_HID = ptr
export const RID_DEVICE_INFO_HID_Init = init

