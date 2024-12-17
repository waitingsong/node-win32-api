/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ToAsyncFunction } from '@waiting/shared-types'
import type { IKoffiCType, IKoffiLib, TypeSpecWithAlignment } from 'koffi'

import type {
  CallingConvention,
  DllFuncsType,
  FnDefFullParams,
  FnDefName,
  FuncDefList,
} from './ffi.types.js'


export type {
  IKoffiRegisteredCallback,
  KoffiFunction,
} from 'koffi'
export type { IKoffiLib }


export interface LoadOptions<T = unknown> {
  dll: string
  dllFuncs: FuncDefList<T>
  usedFuncNames?: FnDefName[] | undefined
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
  /**
   * Multiple choice mapper for function parameters
   */
  multipleChoiceMapperList?: MultipleChoiceMapperList
  /**
   * Force re-register the library, overwriting the existing one
   * @default false
   */
  forceRegister?: boolean
}


export type LibDefBase = Record<string, FnDefFullParams>
export type LibDef2Type<T> = Record<Exclude<keyof T, 'prototype'>, (...args: any) => unknown>

/**
 * FFI library containing functions
 */
export type FLib<T extends object = DllFuncsType> = T & FLibExtMethods & {
  [K in keyof T as K extends `${string}_Async` ? K : `${K & string}_Async`]: T[K] extends (...args: any) => unknown
    ? ToAsyncFunction<T[K]>
    : never
}

export interface FLibExtMethods {
  /**
   * @note Unload the library
   * - On windows, it may cause later calls to functions in the library to fail!
   * - On some platforms (such as with the musl C library on Linux), shared libraries cannot be unloaded,
   *  so the library will remain loaded and memory mapped after the call to lib.unload().
   */
  unload: () => void
  updateMultipleChoiceMapper: (options: UpdateMultipleChoiceMapperOptions) => void
}

export interface UpdateMultipleChoiceMapperOptions {
  /** update using name+Set */
  fnName?: string
  mapperSet?: MultipleChoiceMapperSet
  /** update using Map (contains name+Set) */
  mapperList?: MultipleChoiceMapperList
}

/**
 * Multiple choice parameter mapper
 * return the matched function definition arguments if matched,
 * otherwise return undefined (will then match the next mapper)
 */
export type _MultipleChoiceMapper<TRuntimeArgs extends any[] = any, TFnDefArgs extends string[] | readonly string[] = any> = (
  fnName: string,
  runtimeArgs: TRuntimeArgs,
  fnDefCallParamsExpanded: (Readonly<TFnDefArgs> | TFnDefArgs)[]
) => TFnDefArgs | string[] | readonly string[] | undefined

export type MultipleChoiceMapper<TRuntimeArgs extends any[] = any, TFnDefArgs extends string[] | readonly string[] = any>
  = _MultipleChoiceMapper<TRuntimeArgs, TFnDefArgs> & { name: string }

export type MultipleChoiceMapperList = Map<string, MultipleChoiceMapperSet>
export type MultipleChoiceMapperSet = Set<MultipleChoiceMapper>


/**
 * The return value of payload always be new one after each call of the struct factory function or access payload
 */
export interface StructFactoryResult<T extends object = object> extends StructDetail {
  /**
   * Struct payload for _Out_ or _Inout_ parameter
   */
  readonly payload: T
  readonly sizeColumns?: PropertyKey[]
}

export interface StructDetail {
  readonly name: string
  readonly pointer: string
  readonly CType: IKoffiCType
  readonly size: number
}
export type StructFactory = () => StructFactoryResult

export interface StructInitType {
  [key: string]: string | IKoffiCType | StructFactory | StructInitType
}

export type StructInitPlainType = Record<string, TypeSpecWithAlignment>
