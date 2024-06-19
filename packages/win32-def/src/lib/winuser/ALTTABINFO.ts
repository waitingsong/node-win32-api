import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'
import { POINT_Factory, type POINT_Type } from '../windef/POINT.js'


const key = 'ALTTABINFO'
const ptr = `${key} *`
const init = {
  cbSize: W.DWORD,
  cItems: W.INT,
  cColumns: W.INT,
  cRows: W.INT,
  iColFocus: W.INT,
  iRowFocus: W.INT,
  cxItem: W.INT,
  cyItem: W.INT,
  ptStart: POINT_Factory,
} as const

/**
 * ALTTABINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-alttabinfo
 */
export function ALTTABINFO_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 *  ALTTABINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-alttabinfo
 */
export interface ALTTABINFO_Type {
  cbSize: M.DWORD
  cItems: M.INT
  cColumns: M.INT
  cRows: M.INT
  iColFocus: M.INT
  iRowFocus: M.INT
  cxItem: M.INT
  cyItem: M.INT
  ptStart: POINT_Type
}

export const LPALTTABINFO = ptr
export const ALTTABINFO_Init = init

