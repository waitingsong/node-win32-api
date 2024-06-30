// import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'

import { RAWHID_Factory } from './RAWHID.js'
import { RAWINPUTHEADER_Factory } from './RAWINPUTHEADER.js'
import { RAWKEYBOARD_Factory } from './RAWKEYBOARD.js'
import { RAWMOUSE_Factory } from './RAWMOUSE.js'


const key = 'RAWINPUT'
const ptr = `${key}*` as const
const init: StructInitType = {
  header: RAWINPUTHEADER_Factory,
  u: {
    mouse: RAWMOUSE_Factory,
    keyboard: RAWKEYBOARD_Factory,
    hid: RAWHID_Factory,
  },
} as const

export const LPRAWINPUT = ptr
export const RAWINPUT_Name = key
export const RAWINPUT_Init: typeof init = init

/**
 * RAWINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawinput
 */
export function RAWINPUT_Factory(): StructFactoryResult<RAWINPUT_Type> {
  return genStruct<RAWINPUT_Type>(init, key, ptr)
}

/**
 * RAWINPUT structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-rawinput
 */
export interface RAWINPUT_Type {
  dwSizeHid: T.DWORD
  dwCount: T.DWORD
  /** bRawData[1] */
  bRawData: T.BYTE
}
