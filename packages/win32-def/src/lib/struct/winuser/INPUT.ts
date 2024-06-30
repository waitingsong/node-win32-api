import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'

import { HARDWAREINPUT_Factory } from './HARDWAREINPUT.js'
import type { HARDWAREINPUT_TYPE } from './HARDWAREINPUT.js'
import { KEYBDINPUT_Factory } from './KEYBDINPUT.js'
import type { KEYBDINPUT_Type } from './KEYBDINPUT.js'
import { MOUSEINPUT_Factory } from './MOUSEINPUT.js'
import type { MOUSEINPUT_Type } from './MOUSEINPUT.js'


const key = 'INPUT'
const ptr = `${key}*` as const
const init: StructInitType = {
  type: D.UINT32,
  u: {
    mi: MOUSEINPUT_Factory,
    ki: KEYBDINPUT_Factory,
    hi: HARDWAREINPUT_Factory,
  },
} as const

export const LPINPUT = ptr
export const INPUT_Name = key
export const INPUT_Init: typeof init = init

/**
 * INPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-input
 */
export function INPUT_Factory(): StructFactoryResult<HARDWAREINPUT_TYPE> {
  return genStruct<HARDWAREINPUT_TYPE>(init, key, ptr)
}

/**
 * INPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-input
 */
export interface INPUT_Type {
  type: T.UINT32
  u: {
    mi?: MOUSEINPUT_Type,
    ki?: KEYBDINPUT_Type,
    hi?: HARDWAREINPUT_TYPE,
  }
}

// export const INPUT = koffi.struct('INPUT', {
//   type: W.UINT32,
//   u: koffi.union({
//     mi: MOUSEINPUT,
//     ki: KEYBDINPUT,
//     hi: HARDWAREINPUT,
//   }),
// })


