/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { BigIntStr } from '@waiting/shared-types'


export type _WIN64 = boolean
export type _UNICODE = boolean

export type StructTypeConstructor<T = object> = new () => Record<keyof T, string | number | BigIntStr | Buffer>

export interface LoadSettings {
  singleton: boolean // for DLL.load()
  _WIN64?: boolean // default from process.arch
  /**
 * Calling convention
 * @default 'Cdecl'
 * @link https://koffi.dev/functions#calling-conventions
 */
  convention?: CallingConvention
  /**
   * Create struct automatically from parameters of function definition list
   * @description param like 'POINT*' or 'POINT *', POINT_Factory() will be called
   * @default true
   */
  autoCreateStruct?: boolean // for load()
}

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
export type FnDefCallParam = FnDefParam // each param of calling function
export type FnDefCallParams = FnDefCallParam[] | never[] // calling params
export type FnDefParams = [FnDefRetType, FnDefCallParams] // def for ffi [returnType, [calling param, ...]]
// export interface DllFuncs {
//   [fn: string]: FnParams
// }
export type FuncDefList<T = DllFuncsType> = Record<(keyof T) & string, FnDefParams>

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
export type DllFuncsType = Record<string, SyncFnType>
export type SyncFnType = (...args: any[]) => boolean | number | BigIntStr | Buffer | undefined


