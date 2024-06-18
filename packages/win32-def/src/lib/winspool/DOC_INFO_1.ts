import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genStruct, type KoffiTypeResult } from '../helper2.js'


const key = 'DOC_INFO_1'
const ptr = `${key} *`
const init = {
  pDocName: W.LPTSTR,
  pOutputFile: W.LPTSTR,
  pDatatype: W.LPTSTR,
} as const

/**
 * DOC_INFO_1 structure,
 * Describes a document that will be printed.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export function DOC_INFO_1_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * DOC_INFO_1 structure,
 * Describes a document that will be printed.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export interface DOC_INFO_1_Type {
  pDocName: M.LPTSTR
  pOutputFile: M.LPTSTR
  pDatatype: M.LPTSTR
}

export const LPDOC_INFO_1 = ptr
export const DOC_INFO_1_Init = init

