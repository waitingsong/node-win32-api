import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'PRINTER_INFO_1'
const ptr = `${key}*`
const init = {
  Flags: W.DWORD,
  pDescription: W.LPTSTR,
  pName: W.LPTSTR,
  pComment: W.LPTSTR,
} as const

/**
 * PRINTER_INFO_1 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-1
 */
export function PRINTER_INFO_1_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * PRINTER_INFO_1 structure,
 * Specifies general printer information
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/PRINTER-INFO-1
 */
export interface PRINTER_INFO_1_Type {
  Flags: M.DWORD
  pDescription: M.LPTSTR
  pName: M.LPTSTR
  pComment: M.LPTSTR
}

export const PPRINTER_INFO_1 = ptr
export const PRINTER_INFO_1_Init = init

