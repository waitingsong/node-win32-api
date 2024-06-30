import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'INITCOMMONCONTROLSEX'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwSize: D.DWORD,
  dwICC: D.DWORD,
} as const

export const LPINITCOMMONCONTROLSEX = ptr
export const INITCOMMONCONTROLSEX_Name = key
export const INITCOMMONCONTROLSEX_Init: typeof init = init

/**
 * INITCOMMONCONTROLSEX structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex
 */
export function INITCOMMONCONTROLSEX_Factory(): StructFactoryResult<INITCOMMONCONTROLSEX_Type> {
  return genStruct<INITCOMMONCONTROLSEX_Type>(init, key, ptr, ['dwSize'])
}

/**
 * INITCOMMONCONTROLSEX structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex
 */
export interface INITCOMMONCONTROLSEX_Type {
  dwSize: T.DWORD
  dwICC: T.DWORD
}

