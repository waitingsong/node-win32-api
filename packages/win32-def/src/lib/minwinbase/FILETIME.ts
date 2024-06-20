import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../struct.helper.js'
import type { StructFactoryResult } from '../types.js'


const key = 'FILETIME'
const ptr = `${key} *`
const init = {
  dwLowDateTime: D.DWORD,
  dwHighDateTime: D.DWORD,
} as const


/**
 * FILETIME structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime
 */
export function FILETIME_Factory(): StructFactoryResult<FILETIME_Type> {
  return genStruct<FILETIME_Type>(init, key, ptr)
}

/**
 * FILETIME structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-filetime
 */
export interface FILETIME_Type {
  dwLowDateTime: T.DWORD
  dwHighDateTime: T.DWORD
}

export const LPFILETIME = ptr
export const FILETIME_Init = init

