import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'SYSTEMTIME'
const ptr = `${key}*` as const
const init: StructInitType = {
  wYear: D.WORD,
  wMonth: D.WORD,
  wDayOfWeek: D.WORD,
  wDay: D.WORD,
  wHour: D.WORD,
  wMinute: D.WORD,
  wSecond: D.WORD,
  wMilliseconds: D.WORD,
} as const

export const LPSYSTEMTIME = ptr
export const SYSTEMTIME_Name = key
export const SYSTEMTIME_Init: typeof init = init

/**
 * SYSTEMTIME structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-systemtime
 */
export function SYSTEMTIME_Factory(): StructFactoryResult<SYSTEMTIME_Type> {
  return genStruct<SYSTEMTIME_Type>(init, key, ptr)
}

/**
 * SYSTEMTIME structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/minwinbase/ns-minwinbase-systemtime
 */
export interface SYSTEMTIME_Type {
  wYear: T.WORD
  wMonth: T.WORD
  wDayOfWeek: T.WORD
  wDay: T.WORD
  wHour: T.WORD
  wMinute: T.WORD
  wSecond: T.WORD
  wMilliseconds: T.WORD
}
