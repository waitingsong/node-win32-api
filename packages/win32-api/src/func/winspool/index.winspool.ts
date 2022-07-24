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
import { EnumPrintersOptions } from './winspool.types.js'


export async function winspoolClosePrinter(hPrinter: M.HANDLE): Promise<boolean> {
  assert(hPrinter)
  const mod = getMod<Win32Fns>(dllName)

  const ret = await mod.ClosePrinter(hPrinter.toString())
  return !! ret
}


/**
 * Enumerates available printers, print servers, domains, or print providers.
 * @docs https://docs.microsoft.com/en-us/windows/win32/printdocs/enumprinters
 */
export async function winspoolEnumPrinters<Level extends M.EnumPrinters_Level>(
  options: EnumPrintersOptions<Level>,
): Promise<M.PRINTER_INFO_X[Level][]> {

  const mod = getMod<Win32Fns>(dllName)

  const name = ucsBufferFrom(options.Name)
  const level = options.Level
  assert(level >= 1 && level <= 5, 'level must be >= 1 and <= 5')

  const cbBuf = options.cbBuf ?? 4096
  assert(cbBuf > 2, 'cbBuf must be > 2')
  const pPrinterEnum = Buffer.alloc(cbBuf)

  const pcbNeeded = ref.alloc('uint32')
  const pcReturned = ref.alloc('uint32')

  const ret = await mod.EnumPrintersW(
    options.Flags,
    name,
    level,
    pPrinterEnum,
    cbBuf,
    pcbNeeded,
    pcReturned,
  )

  const count = pcReturned.readUInt32LE()
  const pcb = pcbNeeded.readUInt32LE()

  if (ret && count) {
    const arr = retriveStruct_PRINTER_INFO(pPrinterEnum, level, count, pcb)
    return arr as unknown as Promise<M.PRINTER_INFO_X[Level][]>
  }
  return []
}


export async function winspoolEnumPrintProcessors(
  pName?: string,
  pEnvironment?: string,
): Promise<M.PRINTPROCESSOR_INFO_1[]> {
// ): Promise<unknown> {

  const mod = getMod<Win32Fns>(dllName)

  const pNameBuf = ucsBufferFrom(pName)
  const pEnvironmentBuf = ucsBufferFrom(pEnvironment)
  const Level = 1
  const pPrintProcessorInfo = Buffer.alloc(512)
  const cbBuf = pPrintProcessorInfo.byteLength
  const pcbNeeded = ref.alloc('uint32')
  const pcReturned = ref.alloc('uint32')

  const ret = await mod.EnumPrintProcessorsW(
    pNameBuf,
    pEnvironmentBuf,
    Level,
    pPrintProcessorInfo,
    cbBuf,
    pcbNeeded,
    pcReturned,
  )

  const count = pcReturned.readUInt32LE()
  const pcb = pcbNeeded.readUInt32LE()

  if (ret && count) {
    return ret
    // const arr = retriveStruct_PRINTPROCESSOR_INFO_1(pPrintProcessorInfo, count, pcb)
    // return arr as unknown as Promise<M.PRINTPROCESSOR_INFO_1[]>
  }
  return []

}

// export async function winspoolEnumPrintProcessorDatatypes(
//   pName: M.LPTSTR,
//   pPrintProcessorName: M.LPTSTR,
//   Level: M.DWORD,
//   pDatatypes: M.LPBYTE,
//   cbBuf: M.DWORD,
//   pcbNeeded: M.LPDWORD,
//   pcReturned: M.LPDWORD,
// ): Promise<M.DWORD> {
//   const mod = getMod<Win32Fns>(dllName)

//   assert(hPrinter)
//   const ret = await mod.EnumPrintProcessorDatatypes(hPrinter.toString())
//   return ret
// }


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
  maxByteLength = 1024,
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
    const [struct] = retriveStruct_PRINTER_INFO(pPrinter, Level, 1, pcb)
    // const pPrinter2 = Buffer.alloc(pcb)
    // const cbBuf2 = pcb
    // const pcbNeeded2 = Buffer.alloc(8)

    // await mod.GetPrinterW(
    //   hPrinter.toString(),
    //   Level,
    //   pPrinter2,
    //   cbBuf2,
    //   pcbNeeded2,
    // )

    // const [struct] = retriveStruct_PRINTER_INFO(pPrinter2, Level, 1)

    return struct
  }

  if (pcb > 0 && pcb > maxByteLength) {
    throw new Error(`maxByteLength is too small, increase to value grater than ${pcb}`)
  }
}


export async function winspoolStartDocPrinter(
  hPrinter: M.HANDLE,
  pDocInfo: M.LPBYTE,
): Promise<M.DWORD> {

  const mod = getMod<Win32Fns>(dllName)

  assert(hPrinter)
  assert(pDocInfo)

  const Level = 1
  const ret = await mod.StartDocPrinterW(hPrinter.toString(), Level, pDocInfo)
  return ret
}

export async function winspoolStartPagePrinter(hPrinter: M.HANDLE): Promise<M.DWORD> {
  const mod = getMod<Win32Fns>(dllName)

  assert(hPrinter)
  const ret = await mod.StartPagePrinter(hPrinter.toString())
  return ret
}


export async function winspoolEndPagePrinter(hPrinter: M.HANDLE): Promise<M.DWORD> {
  const mod = getMod<Win32Fns>(dllName)

  assert(hPrinter)
  const ret = await mod.EndPagePrinter(hPrinter.toString())
  return ret
}

