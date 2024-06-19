import { EnumPrinters_Level } from '../common.types.js'

import { PRINTER_INFO_1_Type } from './PRINTER_INFO_1.js'
import { PRINTER_INFO_4_Type } from './PRINTER_INFO_4.js'


export * from './DOC_INFO_1.js'
export * from './PRINTER_DEFAULTS.js'
export * from './PRINTER_INFO_1.js'
export * from './PRINTER_INFO_4.js'
export * from './PRINTPROCESSOR_INFO_1.js'


export type PRINTER_INFO_X_Type<X extends EnumPrinters_Level> = X extends 1
  ? PRINTER_INFO_1_Type
  : X extends 4
    ? PRINTER_INFO_4_Type
    : never

