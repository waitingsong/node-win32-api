// dict of windef value
import { CallingConvention } from './ffi.types.js'
import type { LoadOptions } from './types.js'


export const config: Config = {
  _WIN64: process.arch === 'x64',
}
export interface Config {
  _WIN64: boolean
}

export const loadOptionsDefault: Omit<LoadOptions, 'dll' | 'dllFuncs'> = {
  _WIN64: config._WIN64,
  convention: CallingConvention.Cdecl,
  autoCreateStruct: true,
}

