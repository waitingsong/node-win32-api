import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'SYSTEMTIME'
const ptr = `${key} *`
const init = {
  wYear: D.WORD,
  wMonth: D.WORD,
  wDayOfWeek: D.WORD,
  wDay: D.WORD,
  wHour: D.WORD,
  wMinute: D.WORD,
  wSecond: D.WORD,
  wMilliseconds: D.WORD,
} as const


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

export const LPSYSTEMTIME = ptr
export const SYSTEMTIME_Init = init

