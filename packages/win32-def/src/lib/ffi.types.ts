/* eslint-disable @typescript-eslint/no-explicit-any */

import type { BigIntStr, MethodTypeUnknown } from '@waiting/shared-types'


export type _WIN64 = boolean
export type _UNICODE = boolean

export type StructTypeConstructor<T = object> = new () => Record<keyof T, string | number | BigIntStr | Buffer>

/**
 * @link https://koffi.dev/functions#calling-conventions
 */
export enum CallingConvention {
  Cdecl = '',
  Stdcall = '__stdcall',
  Fastcall = '__fastcall',
  Thiscall = '__thiscall',
}

// custom
export type PID = number
export type PPID = number

export type FnDefName = string
export type FnDefParam = string // param type for definition of FFI
export type FnDefRetType = FnDefParam
export type FnDefMultipleChoiceParam = FnDefParam[]
/** Runtime input arguments of typeDef */
export type FnDefArgs = FnDefParam[] // ['int', 'int32', ...]
export type FnDefCallParam = FnDefParam | FnDefMultipleChoiceParam // 'int' | ['PRINTER_INFO_1*', 'PRINTER_INFO_4*']
/** Input parameters array of typeDef */
export type FnDefCallParams = readonly FnDefCallParam[] | never[] // ['int', 'int32'] | ['int', ['PRINTER_INFO_1*', 'PRINTER_INFO_4*']]
/** Full parameters include input/output of typeDef */
export type FnDefFullParams = [FnDefRetType, FnDefCallParams] // def for ffi [returnType, [calling param, ...]]
export type FuncDefListInner<T = DllFuncsType> = Map<(keyof T) & string, FnDefFullParams>
// export type FuncDefList<T = DllFuncsType> = Record<(keyof T) & string, any[] | readonly any[]>
export type FuncDefList<T = DllFuncsType> = {
  /** eslint-disable-next-line @typescript-eslint/no-unnecessary-template-expression */
  [K in keyof T as K extends `${string}_Async` ? never : K & string]: any[] | readonly any[]
}


export type FnDefListMap = Map<string, FnDefFullParams>

/**
 * usage:
 * ```ts
 * import * as T from 'win32-def'
 * export interface Foo extends FM.DllFuncsModel {
 *   SDT_OpenPort(port: T.UINT): T.INT
 *   SDT_ClosePort(): T.INT
 * }
 * ```
 */
export type DllFuncsType = Record<string, MethodTypeUnknown>


