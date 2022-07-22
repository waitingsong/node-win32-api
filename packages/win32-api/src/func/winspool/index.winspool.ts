import assert from 'node:assert'

import {
  ucsBufferFrom,
  ucsBufferToString,
} from '../../index.js'
import { getMod } from '../func.helper.js'

import {
  Win32Fns,
  M,
  dllName,
  ref,
  retriveStruct_PRINTER_INFO,
} from './helper.js'


/**
 * Retrieves the printer name of the default printer for the current user on the local computer.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter
 */
export async function winspoolGetDefaultPrinter(maxNameLength = 256): Promise<string> {
  const mod = getMod<Win32Fns>(dllName)

  assert(maxNameLength > 2)

  const len = maxNameLength + 1

  const pszBuf = Buffer.alloc(len * 2)
  const pcchBuf = Buffer.alloc(4)
  pcchBuf.writeUint32LE(len)

  const ret = await mod.GetDefaultPrinterW(pszBuf, pcchBuf)
  if (! ret) {
    return ''
  }

  const pcch = pcchBuf.readUInt32LE()
  if (pcch > 0) {
    const size = pcch - 1
    const psz = ucsBufferToString(pszBuf, size)
    return psz
  }
  return ''
}


/**
 * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/openprinter
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
 */
export async function winspoolOpenPrinter(printerName: string): Promise<M.HANDLE> {
  const mod = getMod<Win32Fns>(dllName)

  assert(printerName)

  const nameBuf = ucsBufferFrom(printerName)
  const ptr = Buffer.alloc(8)
  const ret = await mod.OpenPrinterW(nameBuf, ptr, ref.NULL)
  if (ret) {
    const hWnd = ptr.readBigInt64LE()
    return hWnd
  }
  return 0
}


/**
 * Retrieves information about a specified printer.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getprinter
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/getprinter
 */
export async function winspoolGetPrinter<Level extends M.PRINTER_INFO_LEVEL>(
  hPrinter: M.HANDLE,
  Level: Level,
  maxByteLength = 4096,
): Promise<M.PRINTER_INFO_X[Level] | undefined> {

  const mod = getMod<Win32Fns>(dllName)

  const pPrinter = Buffer.alloc(maxByteLength)
  const cbBuf = pPrinter.byteLength
  const pcbNeeded = Buffer.alloc(8)

  const ret = await mod.GetPrinterW(
    hPrinter.toString(),
    Level,
    pPrinter,
    cbBuf,
    pcbNeeded,
  )
  const pcb = pcbNeeded.readUInt32LE()

  if (ret) {
    const struct = retriveStruct_PRINTER_INFO(pPrinter, Level)
    return struct
  }

  if (pcb > 0 && pcb > maxByteLength) {
    throw new Error(`maxByteLength is too small, increase to value grater than ${pcb}`)
  }
}

