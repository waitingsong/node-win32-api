// dict of windef value
import { LoadSettings } from './ffi.types.js'


export const config: Config = {
  _WIN64: process.arch === 'x64',
}
export interface Config {
  _WIN64: boolean
}

export const settingsDefault: LoadSettings = {
  singleton: true,
  _WIN64: config._WIN64,
}
