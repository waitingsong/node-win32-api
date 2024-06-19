import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { KoffiTypeResult } from '../types.js'


const key = 'KEYBDINPUT'
const ptr = `${key} *`
const init = {
  wVk: D.UINT16,
  wScan: D.UINT16,
  dwFlags: D.UINT32,
  time: D.UINT32,
  dwExtraInfo: D.PUINT,
} as const


/**
 * KEYBDINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-keybdinput
 */
export function KEYBDINPUT_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * KEYBDINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-keybdinput
 */
export interface KEYBDINPUT_Type {
  wVk: T.WORD
  wScan: T.WORD
  dwFlags: T.DWORD
  time: T.DWORD
  dwExtraInfo: T.ULONG_PTR
}

export const LPKEYBDINPUT = ptr
export const KEYBDINPUT_Init = init

