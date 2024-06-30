import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { SYSTEMTIME_Factory } from '../minwinbase/SYSTEMTIME.js'
import type { SYSTEMTIME_Type } from '../minwinbase/SYSTEMTIME.js'
import { genStruct } from '../struct.helper.js'


const key = 'JOB_INFO_1'
const ptr = `${key}*` as const
const init: StructInitType = {
  JobId: D.DWORD,
  pPrinterName: D.LPTSTR,
  pMachineName: D.LPTSTR,
  pUserName: D.LPTSTR,
  pDocument: D.LPTSTR,
  pDatatype: D.LPTSTR,
  pStatus: D.LPTSTR,
  Status: D.DWORD,
  Priority: D.DWORD,
  Position: D.DWORD,
  TotalPages: D.DWORD,
  PagesPrinted: D.DWORD,
  Submitted: SYSTEMTIME_Factory,
} as const

export const PJOB_INFO_1 = ptr
export const JOB_INFO_1_Name = key
export const JOB_INFO_1_Init: typeof init = init

/**
 * JOB_INFO_1 structure,
 * The JOB_INFO_1 structure specifies print-job information such as the job-identifier value
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/job-info-1
 */
export function JOB_INFO_1_Factory(): StructFactoryResult<JOB_INFO_1_Type> {
  return genStruct<JOB_INFO_1_Type>(init, key, ptr)
}

/**
 * JOB_INFO_1 structure,
 * The JOB_INFO_1 structure specifies print-job information such as the job-identifier value
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/job-info-1
 */
export interface JOB_INFO_1_Type {
  JobId: T.DWORD
  pPrinterName: T.LPTSTR
  pMachineName: T.LPTSTR
  pUserName: T.LPTSTR
  pDocument: T.LPTSTR
  pDatatype: T.LPTSTR
  pStatus: T.LPTSTR
  Status: T.DWORD
  Priority: T.DWORD
  Position: T.DWORD
  TotalPages: T.DWORD
  PagesPrinted: T.DWORD
  Submitted: SYSTEMTIME_Type
}

