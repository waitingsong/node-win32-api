import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../struct.helper.js'
import type { StructFactoryResult } from '../types.js'


const key = 'RAWHID'
const ptr = `${key} *`
const init = {
  dwSizeHid: D.DWORD,
  dwCount: D.DWORD,
  /** bRawData[1] */
  bRawData: D.BYTE,
} as const


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

export const LPRAWHID = ptr
export const RAWHID_Init = init

