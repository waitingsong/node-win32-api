import type { IKoffiLib } from 'koffi'
import type { CallingConvention, DllFuncs, FnName, FnParams, LoadSettings } from 'win32-def'


export type { KoffiFunction } from 'koffi'


export const enum DllNames {
  comctl32 = 'comctl32',
  gdi32 = 'gdi32',
  kernel32 = 'kernel32',
  ntdll = 'ntdll',
  spoolss = 'spoolss',
  user32 = 'user32',
  winspool = 'winspool.drv',
}


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

