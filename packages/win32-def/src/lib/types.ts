/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IKoffiLib, IKoffiCType, TypeSpecWithAlignment } from 'koffi'
import type { CallingConvention, DllFuncs, FnName, FnParams, LoadSettings } from 'win32-def'


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
  params: FnParams
  /**
   * Calling convention
   * @default 'Stdcall' (for Windows)
   * @link https://koffi.dev/functions#calling-conventions
   */
  convention?: CallingConvention
}

export interface LoadOptions<T = unknown> {
  dll: string
  dllFuncs: DllFuncs<T>
  usedFuncNames?: FnName[]
  settings?: LoadSettings
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


export interface KoffiTypeResult {
  name: string
  pointer: string
  CType: IKoffiCType
  size: number
}
export type KoffiDefType = Record<string, TypeSpecWithAlignment>
export type KoffiDefComplexType = Record<string, TypeSpecWithAlignment | object>
