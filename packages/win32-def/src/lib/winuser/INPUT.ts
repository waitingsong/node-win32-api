import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'

import { HARDWAREINPUT_Factory, type HARDWAREINPUT_TYPE } from './HARDWAREINPUT.js'
import { KEYBDINPUT_Factory, type KEYBDINPUT_Type } from './KEYBDINPUT.js'
import { MOUSEINPUT_Factory, type MOUSEINPUT_Type } from './MOUSEINPUT.js'


const key = 'INPUT'
const ptr = `${key} *`
const init = {
  type: D.UINT32,
  u: {
    mi: MOUSEINPUT_Factory,
    ki: KEYBDINPUT_Factory,
    hi: HARDWAREINPUT_Factory,
  },
} as const


/**
 * INPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-input
 */
export function INPUT_Factory(): StructFactoryResult {
  return genStruct(init, key, ptr)
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

export const LPINPUT = ptr
export const INPUT_Init = init

// export const INPUT = koffi.struct('INPUT', {
//   type: W.UINT32,
//   u: koffi.union({
//     mi: MOUSEINPUT,
//     ki: KEYBDINPUT,
//     hi: HARDWAREINPUT,
//   }),
// })


