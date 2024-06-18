import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genFixedInt16Array, genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'DISPLAY_DEVICEW'
const ptr = `${key} *`
const init = {
  cb: W.DWORD,
  DeviceName: genFixedInt16Array(32),
  DeviceString: genFixedInt16Array(128),
  StateFlags: W.DWORD,
  DeviceID: genFixedInt16Array(128),
  DeviceKey: genFixedInt16Array(128),
} as const

/**
 * DISPLAY_DEVICEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-display_devicew
 */
export function DISPLAY_DEVICEW_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * DISPLAY_DEVICEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-display_devicew
 */
export interface DISPLAY_DEVICEW_Type {
  cb: M.DWORD
  DeviceName: M.WCHAR_Array
  DeviceString: M.WCHAR_Array
  StateFlags: M.DWORD
  DeviceID: M.WCHAR_Array
  DeviceKey: M.WCHAR_Array
}

export const LPDISPLAY_DEVICEW = ptr
export const DISPLAY_DEVICEW_Init = init

