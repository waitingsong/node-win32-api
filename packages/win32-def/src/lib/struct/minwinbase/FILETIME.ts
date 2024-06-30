import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'FILETIME'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwLowDateTime: D.DWORD,
  dwHighDateTime: D.DWORD,
} as const

export const LPFILETIME = ptr
export const LPFILETIME_Name = key
export const FILETIME_Init: typeof init = init

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
