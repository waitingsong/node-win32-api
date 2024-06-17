import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { KoffiTypeResult, genSimpleStruct } from '../helper2.js'


const key = 'INITCOMMONCONTROLSEX'
const ptr = `${key}*`
const init = {
  dwSize: W.DWORD,
  dwICC: W.DWORD,
} as const


/**
 * INITCOMMONCONTROLSEX structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex
 */
export function INITCOMMONCONTROLSEX_Factory(): KoffiTypeResult {
  return genSimpleStruct(init, key, ptr)
}

/**
 * INITCOMMONCONTROLSEX structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/commctrl/nf-commctrl-initcommoncontrolsex
 */
export interface INITCOMMONCONTROLSEX_Type {
  dwSize: M.DWORD
  dwICC: M.DWORD
}

export const LPINITCOMMONCONTROLSEX = ptr
export const INITCOMMONCONTROLSEX_Init = init

