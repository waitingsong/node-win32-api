import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../struct.helper.js'
import type { StructFactoryResult } from '../types.js'


const key = 'HARDWAREINPUT'
const ptr = `${key} *`
const init = {
  uMsg: D.UINT32,
  wParamL: D.UINT16,
  wParamH: D.UINT16,
} as const

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

export const LPHARDWAREINPUT = ptr
export const HARDWAREINPUT_Init = init

