import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'RECT'
const ptr = `${key} *`
const init = {
  left: D.LONG,
  top: D.LONG,
  right: D.LONG,
  bottom: D.LONG,
} as const


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

export const LPRECT = ptr
export const RECT_Init = init

