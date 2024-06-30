import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RAWHID'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwSizeHid: D.DWORD,
  dwCount: D.DWORD,
  /** bRawData[1] */
  bRawData: D.BYTE,
} as const

export const LPRAWHID = ptr
export const RAWHID_Name = key
export const RAWHID_Init: typeof init = init

/**
 * RAWHID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawhid
 */
export function RAWHID_Factory(): StructFactoryResult<RAWHID_Type> {
  return genStruct<RAWHID_Type>(init, key, ptr)
}

/**
 * RAWHID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawhid
 */
export interface RAWHID_Type {
  dwSizeHid: T.DWORD
  dwCount: T.DWORD
  /** bRawData[1] */
  bRawData: T.BYTE
}
