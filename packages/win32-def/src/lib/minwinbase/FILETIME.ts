import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'FILETIME'
const ptr = `${key} *`
const init = {
  dwLowDateTime: W.DWORD,
  dwHighDateTime: W.DWORD,
} as const


/**
 * FILETIME structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime
 */
export function FILETIME_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * FILETIME structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime
 */
export interface FILETIME_Type {
  dwLowDateTime: M.DWORD
  dwHighDateTime: M.DWORD
}

export const LPFILETIME = ptr
export const FILETIME_Init = init

