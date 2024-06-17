import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { KoffiTypeResult, genSimpleStruct } from '../helper2.js'


/**
 * HARDWAREINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-hardwareinput
 */
export function HARDWAREINPUT_Factory(): KoffiTypeResult {
  return genSimpleStruct(init, key, ptr)
}
/**
 * HARDWAREINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-hardwareinput
 */
export interface HARDWAREINPUT_TYPE {
  uMsg: M.UINT32
  wParamL: M.UINT16
  wParamH: M.UINT16
}

const init = {
  uMsg: W.UINT32,
  wParamL: W.UINT16,
  wParamH: W.UINT16,
} as const
const key = 'HARDWAREINPUT'
const ptr = `${key}*`

export const LPHARDWAREINPUT = ptr
export const HARDWAREINPUT_Init = init

