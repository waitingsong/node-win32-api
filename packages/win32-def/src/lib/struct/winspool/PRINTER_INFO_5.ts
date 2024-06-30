import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'PRINTER_INFO_5'
const ptr = `${key}*` as const
const init: StructInitType = {
  pPrinterName: D.WString,
  pPortName: D.WString,
  Attributes: D.DWORD,
  DeviceNotSelectedTimeout: D.DWORD,
  TransmissionRetryTimeout: D.DWORD,
} as const

export const PPRINTER_INFO_5 = ptr
export const PRINTER_INFO_5_Name = key
export const PRINTER_INFO_5_Init: typeof init = init

/**
 * PRINTER_INFO_5 structure,
 * structure specifies detailed printer information.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-5
 */
export function PRINTER_INFO_5_Factory(): StructFactoryResult<PRINTER_INFO_5_Type> {
  return genStruct<PRINTER_INFO_5_Type>(init, key, ptr)
}

/**
 * PRINTER_INFO_5 structure,
 * structure specifies detailed printer information.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-5
 */
export interface PRINTER_INFO_5_Type {
  pPrinterName: T.WString
  pPortName: T.WString
  Attributes: T.DWORD
  DeviceNotSelectedTimeout: T.DWORD
  TransmissionRetryTimeout: T.DWORD
}

