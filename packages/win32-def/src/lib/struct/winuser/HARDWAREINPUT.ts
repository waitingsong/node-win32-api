import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'HARDWAREINPUT'
const ptr = `${key}*` as const
const init: StructInitType = {
  uMsg: D.UINT32,
  wParamL: D.UINT16,
  wParamH: D.UINT16,
} as const

export const LPHARDWAREINPUT = ptr
export const HARDWAREINPUT_Name = key
export const HARDWAREINPUT_Init: typeof init = init

/**
 * HARDWAREINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-hardwareinput
 */
export function HARDWAREINPUT_Factory(): StructFactoryResult<HARDWAREINPUT_TYPE> {
  return genStruct<HARDWAREINPUT_TYPE>(init, key, ptr)
}
/**
 * HARDWAREINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-hardwareinput
 */
export interface HARDWAREINPUT_TYPE {
  uMsg: T.UINT32
  wParamL: T.UINT16
  wParamH: T.UINT16
}
