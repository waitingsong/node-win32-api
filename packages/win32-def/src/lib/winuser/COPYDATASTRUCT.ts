import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


const key = 'COPYDATASTRUCT'
const ptr = `${key} *`
const init = {
  dwData: D.ULONG_PTR,
  cbData: D.DWORD,
  lpData: D.PVOID,
} as const


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

export const LPCOPYDATASTRUCT = ptr
export const COPYDATASTRUCT_Init = init

