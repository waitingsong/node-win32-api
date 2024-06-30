import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'RAWKEYBOARD'
const ptr = `${key}*` as const
const init: StructInitType = {
  MakeCode: D.USHORT,
  Flags: D.USHORT,
  Reserved: D.USHORT,
  VKey: D.USHORT,
  Message: D.UINT,
  ExtraInformation: D.ULONG,
} as const

export const LPRAWKEYBOARD = ptr
export const RAWKEYBOARD_Name = key
export const RAWKEYBOARD_Init: typeof init = init

/**
 * RAWKEYBOARD structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWKEYBOARD
 */
export function RAWKEYBOARD_Factory(): StructFactoryResult<RAWKEYBOARD_Type> {
  return genStruct<RAWKEYBOARD_Type>(init, key, ptr)
}

/**
 * RAWKEYBOARD structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-RAWKEYBOARD
 */
export interface RAWKEYBOARD_Type {
  MakeCode: T.USHORT
  Flags: T.USHORT
  Reserved: T.USHORT
  VKey: T.USHORT
  Message: T.UINT
  ExtraInformation: T.ULONG
}
