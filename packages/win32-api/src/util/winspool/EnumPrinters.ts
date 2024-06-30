import assert from 'node:assert'

// must use ffi from 'win32-def'
import { ffi } from 'win32-def'
import {


  PRINTER_INFO_X_Factory,
  getPRINTER_INFO_X_Ptr,
} from 'win32-def/struct'
import type { EnumPrinters_Level, EnumPrinters_Level_X_Type } from 'win32-def/struct'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'

import type { EnumPrintersOptions } from './winspool.types.js'


const funcName: keyof LibWinspool = 'EnumPrintersW'


/**
 * Enumerates available printers, print servers, domains, or print providers.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprinters
 *
 * 枚举可用的打印机、打印服务器、域或打印提供程序
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/enumprinters
 */
export async function EnumPrinters<Level extends EnumPrinters_Level>(
  options: EnumPrintersOptions<Level>,
): Promise<EnumPrinters_Level_X_Type<Level>[]> {

  const level = options.Level

  const lib = load([funcName])

  const name = ''
  // assert(level >= 1 && level <= 5, 'level must be >= 1 and <= 5')

  const cbBuf = options.cbBuf ?? 4096
  assert(cbBuf > 2, 'cbBuf must be > 2')
  const buf = Buffer.alloc(cbBuf)

  const pcbNeeded = Buffer.alloc(4)
  const pcReturned = Buffer.alloc(4)

  const ret = await lib.EnumPrintersW_Async(
    options.Flags,
    name,
    level,
    buf,
    cbBuf,
    pcbNeeded,
    pcReturned,
  )
  assert(ret, 'EnumPrintersW() failed')

  PRINTER_INFO_X_Factory(level)

  const count = pcReturned.readUInt32LE()
  // const pcb = pcbNeeded.readUInt32LE()
  const ptr = getPRINTER_INFO_X_Ptr(level)
  const key = ptr.replace(/\s*\*/u, '') // 'PRINTER_INFO_1' | 'PRINTER_INFO_2'
  const decodeType = `${key}[${count}]`

  const infoArr = ffi.decode(buf, decodeType) as EnumPrinters_Level_X_Type<Level>[]
  return infoArr
}

