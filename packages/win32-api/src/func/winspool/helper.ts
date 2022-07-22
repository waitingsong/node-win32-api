import assert from 'node:assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import {
  DllNames,
  DStruct as DS,
  StructFactory,
  DModel as M,
  ptrToString,
} from '../../index.js'
import { Winspool as DLL } from '../../index.promise.js'


export {
  M, DS, ref,
}

export const dllName = DllNames.winspool
export type Win32Fns = DLL.Win32Fns


export function retriveStruct_PRINTER_INFO<L extends M.PRINTER_INFO_LEVEL>(
  pPrinter: Buffer,
  Level: L,
  maxCount = 1,
  pcbNeeded?: number,
): M.PRINTER_INFO_X[L][] {

  assert(maxCount >= 1, 'maxCount must be >= 1')

  const pcb: number = typeof pcbNeeded === 'number'
    ? pcbNeeded
    : pPrinter.byteLength
  assert(pcb >= 16, 'Buffer too small')

  switch (Level) {
    case 1:
      return retriveStruct_PRINTER_INFO_1(pPrinter, maxCount, pcb) as M.PRINTER_INFO_X[L][]
    case 4:
      return retriveStruct_PRINTER_INFO_4(pPrinter, maxCount, pcb) as M.PRINTER_INFO_X[L][]
    default:
      throw new Error(`Level not implemented:${Level}`)
  }

}


function retriveStruct_PRINTER_INFO_1(
  pPrinter: Buffer,
  maxCount: number,
  pcbNeeded: number,
): M.PRINTER_INFO_1[] {

  const ret: M.PRINTER_INFO_1[] = []
  const blen = pcbNeeded

  const keys = 4
  const itemLen = keys * 8 // byes
  const rowLen = maxCount * itemLen

  for (let i = 0; i < maxCount; i += 1) {
    const buf = Buffer.alloc(rowLen)
    pPrinter.copy(buf, 0, i * itemLen)
    const struct = rpi1(buf, blen)
    ret.push(struct)
  }

  return ret
}

function rpi1(
  addressBuffer: Buffer,
  maxByteLength: number,
): M.PRINTER_INFO_1 {

  const structDef = DS.PRINTER_INFO_1
  const blen = maxByteLength
  assert(blen >= 16, 'Buffer too small')

  // Flags: DWORD
  // pDescription: WCHAR_String
  // pName: WCHAR_String
  // pComment: WCHAR_String
  const struct = StructFactory<M.PRINTER_INFO_X[1]>(structDef)
  struct.Flags = addressBuffer.readUInt32LE(0)

  const addr1 = addressBuffer.readUInt64LE(8)
  struct.pDescription = ptrToString(addr1, blen)

  const addr2 = addressBuffer.readUInt64LE(16)
  struct.pName = ptrToString(addr2, blen)

  const addr3 = addressBuffer.readUInt64LE(24)
  struct.pName = ptrToString(addr3, blen)

  return struct
}



function retriveStruct_PRINTER_INFO_4(
  pPrinter: Buffer,
  maxCount: number,
  pcbNeeded: number,
): M.PRINTER_INFO_4[] {

  const ret: M.PRINTER_INFO_4[] = []
  const blen = pcbNeeded

  for (let i = 0; i < maxCount; i += 1) {
    const buf = Buffer.alloc(maxCount * 24) // 3key * 8byte * maxCount
    pPrinter.copy(buf, 0, i * 24)
    const struct = rpi4(buf, blen)
    ret.push(struct)
  }

  return ret
}

function rpi4(
  addressBuffer: Buffer,
  maxByteLength: number,
): M.PRINTER_INFO_4 {

  const structDef = DS.PRINTER_INFO_4
  const blen = maxByteLength

  assert(blen >= 16, 'Buffer too small')

  // const pbuf = Buffer.alloc(blen)
  // pPrinter.copy(pbuf, 0, 24)
  // const txtArr = ucsBufferSplit(pbuf)

  const struct = StructFactory<M.PRINTER_INFO_X[4]>(structDef)
  // pPrinterName: WCHAR_String
  // pServerName: WCHAR_String
  // Attributes: DWORD
  const addrPName = addressBuffer.readUInt64LE(0)
  struct.pPrinterName = ptrToString(addrPName, blen)

  const addrSName = addressBuffer.readUInt64LE(8)
  struct.pServerName = ptrToString(addrSName, blen)

  struct.Attributes = addressBuffer.readUInt32LE(16)

  return struct
}

