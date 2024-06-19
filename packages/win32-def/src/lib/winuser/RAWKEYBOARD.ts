import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


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
export function RAWKEYBOARD_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
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

