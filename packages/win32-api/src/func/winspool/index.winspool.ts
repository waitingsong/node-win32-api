import assert from 'node:assert'

import { getMod } from '../func.helper.js'

import { Win32Fns, dllName, M, ref } from './helper.js'


/**
 * Retrieves the printer name of the default printer for the current user on the local computer.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter
 */
export async function winspoolGetDefaultPrinter(maxNameLength = 256): Promise<string | undefined> {
  const mod = getMod<Win32Fns>(dllName)

  assert(maxNameLength > 2)

  const len = maxNameLength + 1

  const pszBuf = Buffer.alloc(len * 2)
  const pcchBuf = Buffer.alloc(4)
  pcchBuf.writeUint32LE(len)

  const ret = await mod.GetDefaultPrinterW(pszBuf, pcchBuf)
  if (! ret) {
    return
  }

  const pcch = pcchBuf.readUInt32LE()
  if (pcch > 0) {
    const size = pcch - 1
    const psz = pszBuf.toString('ucs2', 0, size * 2).replace(/\0+$/u, '')
    return psz
  }
}


/**
 * Retrieves a handle to the specified printer or print server or other types of handles in the print subsystem.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/openprinter
 * @docs https://docs.microsoft.com/zh-cn/windows/win32/printdocs/openprinter
 */
export async function winspoolOpenPrinter(printerName: string): Promise<M.HANDLE | undefined> {
  const mod = getMod<Win32Fns>(dllName)

  assert(printerName)

  const nameBuf = Buffer.from(printerName + '\0', 'ucs2')
  const ptr = Buffer.alloc(8)
  const ret = await mod.OpenPrinterW(nameBuf, ptr, ref.NULL)
  if (ret) {
    const hWnd = ptr.readBigInt64LE()
    return hWnd
  }
}

