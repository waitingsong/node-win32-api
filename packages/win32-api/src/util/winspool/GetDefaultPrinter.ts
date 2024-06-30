import assert from 'node:assert'

import { ucsBufferToString } from 'win32-def'

import { load } from '##/lib/winspool/index.js'
import type { LibWinspool } from '##/lib/winspool/index.js'


const funcName: keyof LibWinspool = 'GetDefaultPrinterW'


/**
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/getdefaultprinter
 */
export async function GetDefaultPrinter(maxNameLength = 256): Promise<string | null> {
  const lib = load([funcName])

  assert(maxNameLength > 2, 'maxNameLength must be greater than 2')

  const len = maxNameLength + 1

  const pszBuf = Buffer.alloc(len * 2)
  const pcchBuf = Buffer.alloc(4)
  pcchBuf.writeUint32LE(len)

  const ret = await lib.GetDefaultPrinterW_Async(pszBuf, pcchBuf)
  if (! ret) {
    // throw new Error('GetDefaultPrinterW() failed. May maxNameLength be too small?')
    return null
  }

  const pcch = pcchBuf.readUInt32LE()
  if (pcch > 0) {
    const size = pcch - 1
    const psz = ucsBufferToString(pszBuf, size)
    return psz
  }
  return ''
}

