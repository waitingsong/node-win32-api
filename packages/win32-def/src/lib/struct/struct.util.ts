import assert from 'node:assert'

import type { StructFactoryResult } from '##/lib/types.js'

import {
  PPRINTER_INFO_1,
  PPRINTER_INFO_4,
  PPRINTER_INFO_5,
  PPRINTER_INFO_6,
  PPRINTER_INFO_8,
  PPRINTER_INFO_9,
  PRINTER_INFO_1_Factory,
  PRINTER_INFO_4_Factory,
  PRINTER_INFO_5_Factory,
  PRINTER_INFO_6_Factory,
  PRINTER_INFO_8_Factory,
  PRINTER_INFO_9_Factory,
} from './struct.index.js'
import type { PRINTER_INFO_LEVEL, PRINTER_INFO_X_Type } from './winspool/helper.types.js'


export type PRINTER_INFO_X_Ptr_Type<X extends PRINTER_INFO_LEVEL> = X extends 1
  ? typeof PPRINTER_INFO_1
  : X extends 4
    ? typeof PPRINTER_INFO_4
    : X extends 5
      ? typeof PPRINTER_INFO_5
      : X extends 8
        ? typeof PPRINTER_INFO_8
        : X extends 9
          ? typeof PPRINTER_INFO_9
          : never


export function getPRINTER_INFO_X_Ptr<X extends PRINTER_INFO_LEVEL>(level: X): PRINTER_INFO_X_Ptr_Type<X> {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (level) {
    case 1: return PPRINTER_INFO_1 as PRINTER_INFO_X_Ptr_Type<X>

    case 4: return PPRINTER_INFO_4 as PRINTER_INFO_X_Ptr_Type<X>

    case 5: return PPRINTER_INFO_5 as PRINTER_INFO_X_Ptr_Type<X>

    case 6: return PPRINTER_INFO_6 as PRINTER_INFO_X_Ptr_Type<X>

    case 8: return PPRINTER_INFO_8 as PRINTER_INFO_X_Ptr_Type<X>

    case 9: return PPRINTER_INFO_9 as PRINTER_INFO_X_Ptr_Type<X>

    /* c8 ignore next 2 */
    default:
      assert(false, `getPRINTER_INFO_X_Ptr(): level not supported: ${level}`)
  }
}

export function PRINTER_INFO_X_Factory<X extends PRINTER_INFO_LEVEL>(level: X): StructFactoryResult<PRINTER_INFO_X_Type<X>> {
  // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check
  switch (level) {
    case 1: return PRINTER_INFO_1_Factory() as StructFactoryResult<PRINTER_INFO_X_Type<X>>

    case 4: return PRINTER_INFO_4_Factory() as StructFactoryResult<PRINTER_INFO_X_Type<X>>

    case 5: return PRINTER_INFO_5_Factory() as StructFactoryResult<PRINTER_INFO_X_Type<X>>

    case 6: return PRINTER_INFO_6_Factory() as StructFactoryResult<PRINTER_INFO_X_Type<X>>

    case 8: return PRINTER_INFO_8_Factory() as StructFactoryResult<PRINTER_INFO_X_Type<X>>

    case 9: return PRINTER_INFO_9_Factory() as StructFactoryResult<PRINTER_INFO_X_Type<X>>

    /* c8 ignore next 2 */
    default:
      assert(false, `level not supported: ${level}`)
  }
}

