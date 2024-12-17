/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AsyncMethodType, MethodType } from '@waiting/shared-types'

import type { CallingConvention, DllFuncsType, FnDefCallParams, FnDefFullParams, FnDefParam, FnDefRetType, FuncDefListInner } from '##/lib/ffi.types.js'
import type { FLib, IKoffiLib, LoadOptions, MultipleChoiceMapperList } from '##/lib/types.js'


export interface BindOptions<T extends object = DllFuncsType> {
  lib: IKoffiLib
  inst: FLib<T>
  loadOptions: LoadOptions
  funcDefList: FuncDefListInner<T>
  multipleChoiceMapperList: MultipleChoiceMapperList | undefined
  /**
   * Force re-register the library, overwriting the existing one
   * @default false
   */
  forceRegister: boolean
}


export interface RegisterFunctionOpts {
  /**
   * DLL library,
   * lib = koffi.load('user32.dll')
   */
  lib: IKoffiLib
  /** function name */
  fnName: string
  /** function parameters */
  fnFullParams: FnDefFullParams
  /**
   * Calling convention
   * @default 'Stdcall' (for Windows)
   * @link https://koffi.dev/functions#calling-conventions
   */
  convention?: CallingConvention
  /**
   * Force re-register the library, overwriting the existing one
   */
  forceRegister: BindOptions['forceRegister']
}

export interface RegisterFunctionOptsInner {
  lib: IKoffiLib
  fnName: string
  fnFullParams: [FnDefRetType, FnDefParam[]]
  convention?: CallingConvention
}


export interface CreateProxyMethodOptions {
  lib: IKoffiLib
  name: string
  fnDefRetType: FnDefParam
  fnDefCallParams: FnDefCallParams
}


export interface KoffiFunctionLike {
  (...args: any[]): any
  async: (...args: any[]) => any
  info: {
    name: string,
    fnDefRetType: FnDefRetType,
    fnDefCallParams: FnDefCallParams,
  }
}

export interface CreateKoffiFunctionOpts {
  name: string
  fnDefRetType: FnDefRetType
  fnDefCallParams: FnDefCallParams
  funcSync: MethodType
  funcAsync: AsyncMethodType
}


/* c8 ignore stop */
