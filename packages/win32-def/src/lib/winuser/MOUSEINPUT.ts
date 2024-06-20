import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../struct.helper.js'
import type { StructFactoryResult } from '../types.js'


const key = 'MOUSEINPUT'
const ptr = `${key} *`
const init = {
  dx: D.LONG,
  dy: D.LONG,
  mouseData: D.UINT32,
  dwFlags: D.UINT32,
  time: D.UINT32,
  dwExtraInfo: D.PUINT,
} as const


/**
 * MOUSEINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-mouseinput
 */
export function MOUSEINPUT_Factory(): StructFactoryResult<MOUSEINPUT_Type> {
  return genStruct<MOUSEINPUT_Type>(init, key, ptr)
}

/**
 * MOUSEINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-mouseinput
 */
export interface MOUSEINPUT_Type {
  dx: T.LONG
  dy: T.LONG
  mouseData: T.UINT32
  dwFlags: T.UINT32
  time: T.UINT32
  dwExtraInfo: T.PUINT
}

export const LPMOUSEINPUT = ptr
export const MOUSEINPUT_Init = init

