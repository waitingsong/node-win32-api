// dict of windef value
import { CallingConvention, LoadSettings } from './ffi.types.js'


export const config: Config = {
  _WIN64: process.arch === 'x64',
}
export interface Config {
  _WIN64: boolean
}

export const settingsDefault: LoadSettings = {
  _WIN64: config._WIN64,
  convention: CallingConvention.Cdecl,
  autoCreateStruct: true,
}

