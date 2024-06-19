import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'
import { POINT_Factory, type POINT_Type } from '../windef/POINT.js'


const key = 'ALTTABINFO'
const ptr = `${key} *`
const init = {
  cbSize: D.DWORD,
  cItems: D.INT,
  cColumns: D.INT,
  cRows: D.INT,
  iColFocus: D.INT,
  iRowFocus: D.INT,
  cxItem: D.INT,
  cyItem: D.INT,
  ptStart: POINT_Factory,
} as const

/**
 * ALTTABINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-alttabinfo
 */
export function ALTTABINFO_Factory(): StructFactoryResult<ALTTABINFO_Type> {
  return genStruct<ALTTABINFO_Type>(init, key, ptr)
}

/**
 *  ALTTABINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-alttabinfo
 */
export interface ALTTABINFO_Type {
  cbSize: T.DWORD
  cItems: T.INT
  cColumns: T.INT
  cRows: T.INT
  iColFocus: T.INT
  iRowFocus: T.INT
  cxItem: T.INT
  cyItem: T.INT
  ptStart: POINT_Type
}

export const LPALTTABINFO = ptr
export const ALTTABINFO_Init = init

