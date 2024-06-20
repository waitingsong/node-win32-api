import * as D from '##/lib/common.def.js'
import * as T from '##/lib/common.types.js'
import { genStruct } from '##/lib/struct.helper.js'
import type { StructFactoryResult } from '##/lib/types.js'


const key = 'PRINTER_INFO_5'
const ptr = `${key} *`
const init = {
  pPrinterName: D.LPTSTR,
  pPortName: D.LPTSTR,
  Attributes: D.DWORD,
  DeviceNotSelectedTimeout: D.DWORD,
  TransmissionRetryTimeout: D.DWORD,
} as const

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
  pPrinterName: T.LPTSTR
  pPortName: T.LPTSTR
  Attributes: T.DWORD
  DeviceNotSelectedTimeout: T.DWORD
  TransmissionRetryTimeout: T.DWORD
}

export const PPRINTER_INFO_5 = ptr
export const PRINTER_INFO_5_Init = init

