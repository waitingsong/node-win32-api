import assert from 'node:assert'

// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import {
  DllNames,
  DStruct as DS,
  DModel as M,
  bufferToStruct,
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

  let ret: M.PRINTER_INFO_X[L][] = []

  switch (Level) {
    case 1: {
      const structDef = DS.PRINTER_INFO_1
      // ret = loopRead(
      //   pPrinter,
      //   maxCount,
      //   pcb,
      //   1,
      //   structDef,
      // ) as M.PRINTER_INFO_X[L][]
      ret = bufferToStruct<M.PRINTER_INFO_X[1]>(
        pPrinter,
        structDef,
        maxCount,
        pcb,
      ) as M.PRINTER_INFO_X[L][]

      break
    }

    case 4: {
      const structDef = DS.PRINTER_INFO_4
      // ret = loopRead(
      //   pPrinter,
      //   maxCount,
      //   pcb,
      //   4,
      //   structDef,
      // ) as M.PRINTER_INFO_X[L][]

      ret = bufferToStruct<M.PRINTER_INFO_X[4]>(
        pPrinter,
        structDef,
        maxCount,
        pcb,
      ) as M.PRINTER_INFO_X[L][]
      break
    }

    default:
      throw new Error(`Level not implemented:${Level}`)
  }

  return ret
}


/*
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


type LoopFuncs<L extends M.PRINTER_INFO_LEVEL = M.PRINTER_INFO_LEVEL> = {
  [K in L]: (addressBuffer: Buffer, maxByteLength: number) => M.PRINTER_INFO_X[K]
}
const loopFuncs: LoopFuncs<1 | 4> = {
  1: rpi1,
  4: rpi4,
}

function loopRead<L extends M.PRINTER_INFO_LEVEL>(
  pPrinter: Buffer,
  maxCount: number,
  pcbNeeded: number,
  Level: L,
  structDef: object, // DS.PRINTER_INFO_[L],
): M.PRINTER_INFO_X[L][] {

  const ret: M.PRINTER_INFO_X[L][] = []

  const blen = pcbNeeded
  // const structDef = DS.PRINTER_INFO_1
  const keyLen = Object.keys(structDef).length
  assert(keyLen >= 1, 'keyLen must be >= 1')

  const itemLen = keyLen * 8 // byes
  const bufByteLen = maxCount * itemLen

  // @ts-expect-error
  const fn = loopFuncs[Level] as LoopFuncs[L]
  assert(typeof fn === 'function')

  for (let i = 0; i < maxCount; i += 1) {
    const buf = Buffer.alloc(bufByteLen)
    pPrinter.copy(buf, 0, i * itemLen)
    const struct = fn(buf, blen)
    ret.push(struct)
  }

  return ret
}
*/



export function retriveStruct_PRINTPROCESSOR_INFO_1(
  pPrintProcessorInfo: Buffer,
  count: number,
  pcb: number,
): M.PRINTPROCESSOR_INFO_1[] {

  if (! pcb) { return [] }

  const structs = bufferToStruct<M.PRINTPROCESSOR_INFO_1>(
    pPrintProcessorInfo,
    DS.PRINTPROCESSOR_INFO_1,
    count,
    pcb,
  )

  return structs
}


export function retriveStruct_DATATYPES_INFO_1(
  pPrintProcessorInfo: Buffer,
  count: number,
  pcb: number,
): M.DATATYPES_INFO_1[] {

  if (! pcb) { return [] }

  const structs = bufferToStruct<M.DATATYPES_INFO_1>(
    pPrintProcessorInfo,
    DS.DATATYPES_INFO_1,
    count,
    pcb,
  )

  return structs
}
