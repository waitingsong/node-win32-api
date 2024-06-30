import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RECT'
const ptr = `${key}*` as const
const init: StructInitType = {
  left: D.LONG,
  top: D.LONG,
  right: D.LONG,
  bottom: D.LONG,
} as const

export const LPRECT = ptr
export const RECT_Name = key
export const RECT_Init: typeof init = init

/**
 * RECT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-RECT
 */
export function RECT_Factory(): StructFactoryResult<RECT_Type> {
  return genStruct<RECT_Type>(init, key, ptr)
}

/**
 * RECT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-RECT
 */
export interface RECT_Type {
  left: T.LONG
  top: T.LONG
  right: T.LONG
  bottom: T.LONG
}

