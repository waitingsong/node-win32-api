// eslint-disable-next-line import/no-extraneous-dependencies
import ref from 'ref-napi'

import {
  DllNames,
  DStruct as DS,
  StructFactory,
  ucsBufferSplit,
  DModel as M,
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
): M.PRINTER_INFO_X[L] {

  switch (Level) {
    case 1:
      return retriveStruct_PRINTER_INFO_1(pPrinter) as M.PRINTER_INFO_X[L]
    case 4:
      return retriveStruct_PRINTER_INFO_4(pPrinter) as M.PRINTER_INFO_X[L]
    default:
      throw new Error(`Level not implemented:${Level}`)
  }

}

export function retriveStruct_PRINTER_INFO_1(pPrinter: Buffer): M.PRINTER_INFO_1 {
  const structDef = DS.PRINTER_INFO_1
  const pbuf = Buffer.alloc(pPrinter.byteLength)
  pPrinter.copy(pbuf, 0, 32)

  const Flags = pPrinter.readUInt32LE()
  const txtArr = ucsBufferSplit(pbuf)

  const struct = StructFactory<M.PRINTER_INFO_X[1]>(structDef)
  struct.Flags = Flags

  const keys = Object.keys(structDef)
  const keysRev = keys.reverse()
  const txtLen = txtArr.length
  keysRev.forEach((key, idx) => {
    if (idx >= txtLen) {
      return
    }
    if (key === 'Attributes') { return }
    if (typeof txtArr[idx] === 'undefined') {
      return
    }
    const str = txtArr[idx] ?? ''
    // @ts-ignore
    if (typeof struct[key] === 'string') {
      // @ts-ignore
      struct[key] = str
    }
  })

  return struct

  // const pDescriptionAddr = pPrinter.readUInt64LE(8)
  // const pNameAddr = pPrinter.readUInt64LE(16)
  // const pCommentAddr = pPrinter.readUInt64LE(24)
  // // @ts-ignore
  // const ptr = ref.alloc('void **')
  // ptr.writeBigInt64LE(BigInt(pDescriptionAddr))
  // const pName = ptr.deref()
  // void pName

}

export function retriveStruct_PRINTER_INFO_4(pPrinter: Buffer): M.PRINTER_INFO_4 {
  const structDef = DS.PRINTER_INFO_4
  const pbuf = Buffer.alloc(pPrinter.byteLength)
  pPrinter.copy(pbuf, 0, 24)

  const attr = pPrinter.readUInt32LE(16)
  // pPrinterName: WCHAR_String
  // pServerName: WCHAR_String
  // Attributes: DWORD

  const txtArr = ucsBufferSplit(pbuf)

  const struct = StructFactory<M.PRINTER_INFO_X[4]>(structDef)
  struct.Attributes = attr

  const keys = Object.keys(structDef)
  // const keysRev = keys.reverse()
  const txtLen = txtArr.length
  keys.forEach((key, idx) => {
    if (idx >= txtLen) {
      return
    }
    if (typeof txtArr[idx] === 'undefined') {
      return
    }
    const str = txtArr[idx] ?? ''
    // @ts-ignore
    if (typeof struct[key] === 'string') {
      // @ts-ignore
      struct[key] = str
    }
  })

  return struct

  // const pDescriptionAddr = pPrinter.readUInt64LE(8)
  // const pNameAddr = pPrinter.readUInt64LE(16)
  // const pCommentAddr = pPrinter.readUInt64LE(24)
  // // @ts-ignore
  // const ptr = ref.alloc('void **')
  // ptr.writeBigInt64LE(BigInt(pDescriptionAddr))
  // const pName = ptr.deref()
  // void pName

}
