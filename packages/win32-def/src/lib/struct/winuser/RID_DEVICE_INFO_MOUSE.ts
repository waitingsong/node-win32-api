import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RID_DEVICE_INFO_MOUSE'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwId: D.DWORD,
  dwNumberOfButtons: D.DWORD,
  dwSampleRate: D.DWORD,
  fHasHorizontalWheel: D.BOOL,
} as const

export const PRID_DEVICE_INFO_MOUSE = ptr
export const RID_DEVICE_INFO_MOUSE_Name = key
export const RID_DEVICE_INFO_MOUSE_Init: typeof init = init

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
