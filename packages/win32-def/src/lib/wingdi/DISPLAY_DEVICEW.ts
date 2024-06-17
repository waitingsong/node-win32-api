import ffi from 'koffi'

import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'DISPLAY_DEVICEW'
const ptr = `${key}*`
const init = {
  cb: W.DWORD,
  DeviceName: ffi.array('int16_t', 32, 'Array'),
  DeviceString: ffi.array('int16_t', 128, 'Array'),
  StateFlags: W.DWORD,
  DeviceID: ffi.array('int16_t', 128, 'Array'),
  DeviceKey: ffi.array('int16_t', 128, 'Array'),
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
  DeviceName: M.WCHAR
  DeviceString: M.WCHAR
  StateFlags: M.DWORD
  DeviceID: M.WCHAR
  DeviceKey: M.WCHAR
}

export const LPDISPLAY_DEVICEW = ptr
export const DISPLAY_DEVICEW_Init = init

