import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'MOUSEINPUT'
const ptr = `${key}*` as const
const init: StructInitType = {
  dx: D.LONG,
  dy: D.LONG,
  mouseData: D.UINT32,
  dwFlags: D.UINT32,
  time: D.UINT32,
  dwExtraInfo: D.PUINT,
} as const

export const LPMOUSEINPUT = ptr
export const MOUSEINPUT_Name = key
export const MOUSEINPUT_Init: typeof init = init

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
