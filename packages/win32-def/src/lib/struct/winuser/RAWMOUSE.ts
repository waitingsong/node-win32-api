import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RAWMOUSE'
const ptr = `${key}*` as const
const init: StructInitType = {
  usFlags: D.USHORT,
  u: {
    ulButtons: D.ULONG,
    s: {
      usButtonFlags: D.USHORT,
      usButtonData: D.USHORT,
    },
  },
  ulRawButtons: D.ULONG,
  lLastX: D.LONG,
  lLastY: D.LONG,
  ulExtraInformation: D.ULONG,
} as const


/**
 * RAWMOUSE structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWMOUSE
 */
export function RAWMOUSE_Factory(): StructFactoryResult<RAWMOUSE_Type> {
  return genStruct<RAWMOUSE_Type>(init, key, ptr)
}

export const LPRAWMOUSE = ptr
export const RAWMOUSE_Name = key
export const RAWMOUSE_Init: typeof init = init

/**
 * RAWHID structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWMOUSE
 */
export interface RAWMOUSE_Type {
  usFlags: T.USHORT
  u: {
    ulButtons: T.ULONG,
    s: {
      usButtonFlags: T.USHORT,
      usButtonData: T.USHORT,
    },
  }
  ulRawButtons: T.ULONG
  lLastX: T.LONG
  lLastY: T.LONG
  ulExtraInformation: T.ULONG
}
