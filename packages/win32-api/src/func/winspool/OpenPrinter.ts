import assert from 'node:assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import { DModel as M } from '../../../src/index.js'
import { getMod } from '../func.helper.js'

import { Win32Fns, dllName } from './helper.js'


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

