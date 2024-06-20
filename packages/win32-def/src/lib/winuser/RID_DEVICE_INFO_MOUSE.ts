import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'RID_DEVICE_INFO_MOUSE'
const ptr = `${key} *`
const init = {
  dwId: D.DWORD,
  dwNumberOfButtons: D.DWORD,
  dwSampleRate: D.DWORD,
  fHasHorizontalWheel: D.BOOL,
} as const


/**
 * RID_DEVICE_INFO_MOUSE structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_MOUSE
 */
export function RID_DEVICE_INFO_MOUSE_Factory(): StructFactoryResult<RID_DEVICE_INFO_MOUSE_Type> {
  return genStruct<RID_DEVICE_INFO_MOUSE_Type>(init, key, ptr)
}

/**
 * RID_DEVICE_INFO_MOUSE structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RID_DEVICE_INFO_MOUSE
 */
export interface RID_DEVICE_INFO_MOUSE_Type {
  dwId: T.DWORD
  dwNumberOfButtons: T.DWORD
  dwSampleRate: T.DWORD
  fHasHorizontalWheel: T.BOOL
}

export const PRID_DEVICE_INFO_MOUSE = ptr
export const RID_DEVICE_INFO_MOUSE_Init = init

