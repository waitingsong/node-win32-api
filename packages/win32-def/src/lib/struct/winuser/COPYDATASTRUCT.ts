import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'COPYDATASTRUCT'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwData: D.ULONG_PTR,
  cbData: D.DWORD,
  lpData: D.PVOID,
} as const

export const LPCOPYDATASTRUCT = ptr
export const COPYDATASTRUCT_Name = key
export const COPYDATASTRUCT_Init: typeof init = init

/**
 * COPYDATASTRUCT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-copydatastruct
 */
export function COPYDATASTRUCT_Factory(): StructFactoryResult<COPYDATASTRUCT_Type> {
  return genStruct<COPYDATASTRUCT_Type>(init, key, ptr)
}

/**
 * POINT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-copydatastruct
 */
export interface COPYDATASTRUCT_Type {
  dwData: T.ULONG_PTR
  cbData: T.DWORD
  lpData: T.PVOID
}
