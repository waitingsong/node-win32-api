import type { PRINTER_INFO_LEVEL, PRINTER_INFO_X_Type } from 'win32-def/struct'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'

import type { GetPrinterOptions } from './winspool.types.js'


const funcName: keyof LibWinspool = 'GetPrinterW'
// type RetType = ReturnType<FnType>
// type ParamType = Parameters<FnType>


/**
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
 */
export async function GetPrinter<Level extends PRINTER_INFO_LEVEL>(options: GetPrinterOptions<Level>): Promise<PRINTER_INFO_X_Type<Level> | null> {
  const { hPrinter, Level, maxLength = 1024 } = options

  const lib = load([funcName])

  const pPrinter = {} as PRINTER_INFO_X_Type<Level>
  const cbBuf = (maxLength + 1) * 2
  const pcbNeeded = Buffer.alloc(8)

  const ret = await lib.GetPrinterW_Async(
    hPrinter,
    Level,
    pPrinter,
    cbBuf,
    pcbNeeded,
  )
  const pcb = pcbNeeded.readUInt32LE()
  if (! ret) {
    if (pcb > maxLength) {
      throw new Error(`maxLength is too small, increase to value grater than ${pcb}`)
    }
    return null
  }

  return pPrinter
}

