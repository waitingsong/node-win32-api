import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


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
export function INITCOMMONCONTROLSEX_Factory(): StructFactoryResult {
  return genStruct(init, key, ptr)
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

