import assert from 'node:assert'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'

import type { StartDocPrinterOptions } from './winspool.types.js'


const funcName: keyof LibWinspool = 'StartDocPrinterW'


/**
 * Notifies the print spooler that a document is to be spooled for printing
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/StartDocPrinter
 *
 * 函数通知打印后台处理程序文档将进行假脱机打印
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/StartDocPrinter
 */
export async function StartDocPrinter(options: StartDocPrinterOptions): Promise<boolean> {
  const { hPrinter, pDocInfo } = options
  assert(hPrinter, 'hPrinter must be a valid handle')
  assert(pDocInfo, 'pDocInfo must be a valid')
  // assert(Buffer.isBuffer(pDocInfo), 'pDocInfo must be a valid pointer (Buffer)')

  const lib = load([funcName])

  const Level = 1
  const ret = await lib.StartDocPrinterW_Async(hPrinter, Level, pDocInfo)
  return !! ret
}

