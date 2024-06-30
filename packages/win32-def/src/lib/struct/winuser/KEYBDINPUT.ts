import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'KEYBDINPUT'
const ptr = `${key}*` as const
const init: StructInitType = {
  wVk: D.UINT16,
  wScan: D.UINT16,
  dwFlags: D.UINT32,
  time: D.UINT32,
  dwExtraInfo: D.PUINT,
} as const

export const LPKEYBDINPUT = ptr
export const KEYBDINPUT_Name = key
export const KEYBDINPUT_Init: typeof init = init

/**
 * KEYBDINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-keybdinput
 */
export function KEYBDINPUT_Factory(): StructFactoryResult<KEYBDINPUT_Type> {
  return genStruct<KEYBDINPUT_Type>(init, key, ptr)
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
