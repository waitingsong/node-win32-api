import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'MOUSEINPUT'
const ptr = `${key} *`
const init = {
  dx: W.LONG,
  dy: W.LONG,
  mouseData: W.UINT32,
  dwFlags: W.UINT32,
  time: W.UINT32,
  dwExtraInfo: W.PUINT,
} as const


/**
 * MOUSEINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-mouseinput
 */
export function MOUSEINPUT_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * MOUSEINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-mouseinput
 */
export interface MOUSEINPUT_Type {
  dx: M.LONG
  dy: M.LONG
  mouseData: M.UINT32
  dwFlags: M.UINT32
  time: M.UINT32
  dwExtraInfo: M.PUINT
}

export const LPMOUSEINPUT = ptr
export const MOUSEINPUT_Init = init

