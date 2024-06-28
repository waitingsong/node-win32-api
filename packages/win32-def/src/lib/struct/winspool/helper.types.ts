import type { PRINTER_INFO_1_Type } from './PRINTER_INFO_1.js'
import type { PRINTER_INFO_4_Type } from './PRINTER_INFO_4.js'
import type { PRINTER_INFO_5_Type } from './PRINTER_INFO_5.js'
import type { PRINTER_INFO_6_Type } from './PRINTER_INFO_6.js'
import type { PRINTER_INFO_8_Type } from './PRINTER_INFO_8.js'
import type { PRINTER_INFO_9_Type } from './PRINTER_INFO_9.js'


export * from './DOC_INFO_1.js'
export * from './PRINTER_DEFAULTS.js'
export * from './PRINTER_INFO_1.js'
export * from './PRINTER_INFO_4.js'
export * from './PRINTER_INFO_5.js'
export * from './PRINTER_INFO_6.js'
export * from './PRINTER_INFO_8.js'
export * from './PRINTER_INFO_9.js'
export * from './PRINTPROCESSOR_INFO_1.js'

// #region EnumPrinters

/**
 * For GetPrinter()
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/getprinter#parameters
 * @todo 2, 3, 6, 7
 */
export type PRINTER_INFO_LEVEL = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

/**
 * For GetPrinter()
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/getprinter#parameters
 * @todo 2, 3, 6, 7
 */
export type PRINTER_INFO_Type = PRINTER_INFO_1_Type | PRINTER_INFO_4_Type | PRINTER_INFO_5_Type | PRINTER_INFO_8_Type | PRINTER_INFO_9_Type

/**
 * For GetPrinter()
 * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/getprinter#parameters
 * @todo 2, 3, 7
 */
export type PRINTER_INFO_X_Type<X extends PRINTER_INFO_LEVEL = PRINTER_INFO_LEVEL> = X extends 1
  ? PRINTER_INFO_1_Type
  : X extends 4
    ? PRINTER_INFO_4_Type
    : X extends 5
      ? PRINTER_INFO_5_Type
      : X extends 6
        ? PRINTER_INFO_6_Type
        : X extends 8
          ? PRINTER_INFO_8_Type
          : X extends 9
            ? PRINTER_INFO_9_Type
            : never


// #region EnumPrinters

/**
 * For EnumPrinters()
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/enumprinters
 * @todo 2
 */
export type EnumPrinters_Level = 1 | 4 | 5

/**
 * For EnumPrinters()
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/enumprinters
 * @todo 2
 */
export type EnumPrinters_Level_Type = PRINTER_INFO_1_Type | PRINTER_INFO_4_Type | PRINTER_INFO_5_Type

/**
 * For EnumPrinters()
 * @link https://learn.microsoft.com/zh-cn/windows/win32/printdocs/enumprinters
 * @todo 2
 */
export type EnumPrinters_Level_X_Type<X extends EnumPrinters_Level = EnumPrinters_Level> = X extends 1
  ? PRINTER_INFO_1_Type
  : X extends 4
    ? PRINTER_INFO_4_Type
    : X extends 5
      ? PRINTER_INFO_5_Type
      : never


