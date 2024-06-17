import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genSimpleStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'KEYBDINPUT'
const ptr = `${key}*`
const init = {
  wVk: W.UINT16,
  wScan: W.UINT16,
  dwFlags: W.UINT32,
  time: W.UINT32,
  dwExtraInfo: W.PUINT,
} as const


/**
 * KEYBDINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-keybdinput
 */
export function KEYBDINPUT_Factory(): KoffiTypeResult {
  return genSimpleStruct(init, key, ptr)
}

/**
 * KEYBDINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-keybdinput
 */
export interface KEYBDINPUT_Type {
  wVk: M.WORD
  wScan: M.WORD
  dwFlags: M.DWORD
  time: M.DWORD
  dwExtraInfo: M.ULONG_PTR
}

export const LPKEYBDINPUT = ptr
export const KEYBDINPUT_Init = init

