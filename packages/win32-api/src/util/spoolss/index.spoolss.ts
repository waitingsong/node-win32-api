import assert from 'node:assert'

import { getMod } from '../func.helper.js'

import {
  Win32Fns,
  M,
  dllName,
} from './helper.js'


export async function spoolWritePrinter(
  hPrinter: M.HANDLE,
  pBuf: M.LPVOID,
  cbBuf: M.DWORD,
): Promise<M.DWORD> {

  const mod = getMod<Win32Fns>(dllName)
  assert(hPrinter)

  const pcWritten = Buffer.alloc(4)
  const ret = await mod.WritePrinter(
    hPrinter.toString(),
    pBuf,
    cbBuf,
    pcWritten,
  )

  if (ret) {
    return pcWritten.readUint32LE()
  }
  return 0
}

export async function spoolEndDocPrinter(hPrinter: M.HANDLE): Promise<boolean> {
  const mod = getMod<Win32Fns>(dllName)
  assert(hPrinter)

  const ret = await mod.EndDocPrinter(hPrinter.toString())
  return !! ret
}

