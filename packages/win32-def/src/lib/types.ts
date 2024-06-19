import type { IKoffiLib } from 'koffi'
import type { CallingConvention, DllFuncs, FnName, FnParams, LoadSettings } from 'win32-def'


export type { KoffiFunction } from 'koffi'

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
