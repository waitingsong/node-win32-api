import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'RAWKEYBOARD'
const ptr = `${key}*`
const init = {
  MakeCode: W.USHORT,
  Flags: W.USHORT,
  Reserved: W.USHORT,
  VKey: W.USHORT,
  Message: W.UINT,
  ExtraInformation: W.ULONG,
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
  MakeCode: M.USHORT
  Flags: M.USHORT
  Reserved: M.USHORT
  VKey: M.USHORT
  Message: M.UINT
  ExtraInformation: M.ULONG
}

export const LPRAWKEYBOARD = ptr
export const RAWKEYBOARD_Init = init

