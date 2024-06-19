import * as D from '../common.def.js'
import * as T from '../common.types.js'
import { genStruct } from '../helper2.js'
import type { StructFactoryResult } from '../types.js'


const key = 'DOC_INFO_1'
const ptr = `${key} *`
const init = {
  pDocName: D.LPTSTR,
  pOutputFile: D.LPTSTR,
  pDatatype: D.LPTSTR,
} as const

/**
 * DOC_INFO_1 structure,
 * Describes a document that will be printed.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export function DOC_INFO_1_Factory(): StructFactoryResult {
  return genStruct(init, key, ptr)
}

/**
 * DOC_INFO_1 structure,
 * Describes a document that will be printed.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export interface DOC_INFO_1_Type {
  pDocName: T.LPTSTR
  pOutputFile: T.LPTSTR
  pDatatype: T.LPTSTR
}

export const LPDOC_INFO_1 = ptr
export const DOC_INFO_1_Init = init

