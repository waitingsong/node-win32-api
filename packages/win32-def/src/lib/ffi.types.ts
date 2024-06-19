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
   * @default true
   */
  autoGc?: boolean // for DLL.load(), do garbage collection(DLL.unload()) when unload
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

export type FnName = string
export type FnParam = string // param type for definition of FFI
export type FnRetType = FnParam
export type FnCallParam = FnParam // each param of calling function
export type FnCallParams = FnCallParam[] | never[] // calling params
export type FnParams = [FnRetType, FnCallParams] // def for ffi [returnType, [calling param, ...]]
// export interface DllFuncs {
//   [fn: string]: FnParams
// }
// export type DllFuncs<T> = Record<keyof T, FnParams>
export type DllFuncs<T = DllFuncsType> = Record<keyof T, FnParams>

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


