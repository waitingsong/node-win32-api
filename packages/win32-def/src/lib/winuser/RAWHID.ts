import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'RAWHID'
const ptr = `${key} *`
const init = {
  dwSizeHid: W.DWORD,
  dwCount: W.DWORD,
  /** bRawData[1] */
  bRawData: W.BYTE,
} as const


/**
 * RAWHID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawhid
 */
export function RAWHID_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * RAWHID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawhid
 */
export interface RAWHID_Type {
  dwSizeHid: M.DWORD
  dwCount: M.DWORD
  /** bRawData[1] */
  bRawData: M.BYTE
}

export const LPRAWHID = ptr
export const RAWHID_Init = init

