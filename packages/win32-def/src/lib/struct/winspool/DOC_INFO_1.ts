import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genStruct } from '../struct.helper.js'


const key = 'DOC_INFO_1'
const ptr = `${key}*` as const
const init: StructInitType = {
  pDocName: D.WString,
  pOutputFile: D.WString,
  pDatatype: D.WString,
} as const

export const LPDOC_INFO_1 = ptr
export const DOC_INFO_1_Name = key
export const DOC_INFO_1_Init: typeof init = init

/**
 * DOC_INFO_1 structure,
 * Describes a document that will be printed.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export function DOC_INFO_1_Factory(): StructFactoryResult<DOC_INFO_1_Type> {
  return genStruct<DOC_INFO_1_Type>(init, key, ptr)
}

/**
 * DOC_INFO_1 structure,
 * Describes a document that will be printed.
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/doc-info-1
 */
export interface DOC_INFO_1_Type {
  pDocName: T.WString
  pOutputFile: T.WString | null
  pDatatype: T.WString
}

