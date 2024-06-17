import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'COPYDATASTRUCT'
const ptr = `${key}*`
const init = {
  dwData: W.ULONG_PTR,
  cbData: W.DWORD,
  lpData: W.PVOID,
} as const


/**
 * COPYDATASTRUCT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-copydatastruct
 */
export function COPYDATASTRUCT_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * POINT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-copydatastruct
 */
export interface COPYDATASTRUCT_Type {
  dwData: M.ULONG_PTR
  cbData: M.DWORD
  lpData: M.PVOID
}

export const LPCOPYDATASTRUCT = ptr
export const COPYDATASTRUCT_Init = init

