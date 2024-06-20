import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genFixedInt16Array, genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'DISPLAY_DEVICEW'
const ptr = `${key} *`
const init = {
  cb: D.DWORD,
  DeviceName: genFixedInt16Array(32),
  DeviceString: genFixedInt16Array(128),
  StateFlags: D.DWORD,
  DeviceID: genFixedInt16Array(128),
  DeviceKey: genFixedInt16Array(128),
} as const

/**
 * DISPLAY_DEVICEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-display_devicew
 */
export function DISPLAY_DEVICEW_Factory(): StructFactoryResult<DISPLAY_DEVICEW_Type> {
  return genStruct<DISPLAY_DEVICEW_Type>(init, key, ptr, ['cb'])
}

/**
 * DISPLAY_DEVICEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-display_devicew
 */
export interface DISPLAY_DEVICEW_Type {
  cb: T.DWORD
  DeviceName: T.WCHAR_Array
  DeviceString: T.WCHAR_Array
  StateFlags: T.DWORD
  DeviceID: T.WCHAR_Array
  DeviceKey: T.WCHAR_Array
}

export const LPDISPLAY_DEVICEW = ptr
export const DISPLAY_DEVICEW_Init = init

