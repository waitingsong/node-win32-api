import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'RAWKEYBOARD'
const ptr = `${key} *`
const init = {
  MakeCode: D.USHORT,
  Flags: D.USHORT,
  Reserved: D.USHORT,
  VKey: D.USHORT,
  Message: D.UINT,
  ExtraInformation: D.ULONG,
} as const


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

export const LPRAWKEYBOARD = ptr
export const RAWKEYBOARD_Init = init

