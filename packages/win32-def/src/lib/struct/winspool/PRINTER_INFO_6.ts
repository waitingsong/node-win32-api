import * as D from '##/lib/common.def.js'
import type { PRINTER_STATUS } from '##/lib/consts/index.consts.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'PRINTER_INFO_6'
const ptr = `${key}*` as const
const init: StructInitType = {
  dwStatus: D.DWORD,
} as const

export const PPRINTER_INFO_6 = ptr
export const PRINTER_INFO_6_Name = key
export const PRINTER_INFO_6_Init: typeof init = init

/**
 * PRINTER_INFO_6 structure,
 * structure specifies detailed printer information.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-6
 */
export function PRINTER_INFO_6_Factory(): StructFactoryResult<PRINTER_INFO_6_Type> {
  return genStruct<PRINTER_INFO_6_Type>(init, key, ptr)
}

/**
 * PRINTER_INFO_6 structure,
 * structure specifies detailed printer information.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-6
 */
export interface PRINTER_INFO_6_Type {
  dwStatus: PRINTER_STATUS
}

