import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'
import { POINT_Factory } from '../windef/POINT.js'
import type { POINT_Type } from '../windef/POINT.js'


const key = 'ALTTABINFO'
const ptr = `${key}*` as const
const init: StructInitType = {
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

export const LPALTTABINFO = ptr
export const ALTTABINFO_Name = key
export const ALTTABINFO_Init: typeof init = init

/**
 * ALTTABINFO structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-alttabinfo
 */
export function ALTTABINFO_Factory(): StructFactoryResult<ALTTABINFO_Type> {
  return genStruct<ALTTABINFO_Type>(init, key, ptr, ['cbSize'])
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

