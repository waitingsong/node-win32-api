/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IKoffiLib, IKoffiCType, TypeSpecWithAlignment } from 'koffi'

import type { CallingConvention, FnDefName, FnDefParams, FuncDefList, LoadSettings } from './ffi.types.js'


export type { KoffiFunction } from 'koffi'
export type { IKoffiLib }

export interface RegisterFunctionOpts {
  /**
   * DLL library,
   * lib = koffi.load('user32.dll')
   */
  lib: IKoffiLib
  /** function name */
  name: string
  /** function parameters */
  params: FnDefParams
  /**
   * Calling convention
   * @default 'Stdcall' (for Windows)
   * @link https://koffi.dev/functions#calling-conventions
   */
  convention?: CallingConvention
}

export interface LoadOptions<T = unknown> {
  dll: string
  dllFuncs: FuncDefList<T>
  usedFuncNames?: FnDefName[] | undefined
  settings?: LoadSettings | undefined
}


export type LibFuncs<T extends object> = T & {
  [K in keyof T as `${K & string}Async`]: T[K] extends (...args: any) => unknown
    ? AsyncFunction<T[K]>
    : never
} & {
  /**
   * @note Unload the library
   * - On windows, do not call this function, it will cause later calls to functions in the library to fail!
   * - On some platforms (such as with the musl C library on Linux), shared libraries cannot be unloaded,
   *  so the library will remain loaded and memory mapped after the call to lib.unload().
   */
  unload: () => void,
}

type AsyncFunction<T extends (...args: any) => unknown> = (...args: Parameters<T>) => Promise<ReturnType<T>>


/**
 * The return value of payload always be new one after each call of the struct factory function or access payload
 */
export interface StructFactoryResult<T extends object = object> extends KoffiTypeResult {
  /**
   * Struct payload for _Out_ or _Inout_ parameter
   */
  readonly payload: T
  readonly sizeColumns?: PropertyKey[]
}

export interface KoffiTypeResult {
  readonly name: string
  readonly pointer: string
  readonly CType: IKoffiCType
  readonly size: number
}
export type KoffiDefType = Record<string, TypeSpecWithAlignment>
export type KoffiDefComplexType = Record<string, TypeSpecWithAlignment | object>

export type StructFactory = () => StructFactoryResult


