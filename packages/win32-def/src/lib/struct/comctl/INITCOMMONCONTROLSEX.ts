import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'INITCOMMONCONTROLSEX'
const ptr = `${key} *`
const init = {
  dwSize: D.DWORD,
  dwICC: D.DWORD,
} as const


/**
 * INITCOMMONCONTROLSEX structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex
 */
export function INITCOMMONCONTROLSEX_Factory(): StructFactoryResult<INITCOMMONCONTROLSEX_Type> {
  return genStruct<INITCOMMONCONTROLSEX_Type>(init, key, ptr)
}

/**
 * INITCOMMONCONTROLSEX structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex
 */
export interface INITCOMMONCONTROLSEX_Type {
  dwSize: T.DWORD
  dwICC: T.DWORD
}

export const LPINITCOMMONCONTROLSEX = ptr
export const INITCOMMONCONTROLSEX_Init = init

