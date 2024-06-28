import type { DOC_INFO_1_Type } from 'win32-def/struct'
import type {
  EnumPrinters_Level,
  HANDLE,
  PRINTER_INFO_LEVEL,
} from 'win32-def/types'


export interface EnumPrintersOptions<Level extends EnumPrinters_Level> {
  Level: Level
  /**
   * PrinterEnumFlags
   * @see https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-rprn/2a1fe8a4-e8be-4cf3-8b37-8d19f9a2edcd
   */
  Flags: number
  Name?: string
  /**
   * @default 4096
   */
  cbBuf?: number
}


export interface GetPrinterOptions<Level extends PRINTER_INFO_LEVEL> {
  hPrinter: HANDLE
  Level: Level
  /**
   * @default 1024
   */
  maxLength?: number
}


export interface StartDocPrinterOptions {
  hPrinter: HANDLE
  pDocInfo: DOC_INFO_1_Type
}

