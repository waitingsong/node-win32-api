import type { HWND } from 'win32-def/types'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'


const funcName: keyof LibWinspool = 'OpenPrinterW'
// type RetType = ReturnType<FnType>
// type ParamType = Parameters<FnType>


/**
 * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/openprinter
 *
 * 检索指定打印机或打印服务器或打印子系统中其他类型的句柄的句柄
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
 */
export async function OpenPrinter(printerName: string): Promise<HWND | null> {
  const lib = load([funcName])

  const buf = Buffer.alloc(8)
  const res = await lib.OpenPrinterW_Async(printerName, buf, null)
  if (! res) {
    return null
  }
  // const hwnd = ffi.address(buf)
  const hwnd = buf.readBigUInt64LE()
  return hwnd
}

