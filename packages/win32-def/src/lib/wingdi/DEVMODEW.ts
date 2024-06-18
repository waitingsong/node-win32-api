import * as W from '../common.def.js'
import * as M from '../common.types.js'
import { genFixedInt16Array, genStruct, type KoffiTypeResult } from '../helper2.js'
import { POINT_Factory, POINT_Type } from '../windef/POINT.js'


const key = 'DEVMODEW'
const ptr = `${key} *`
const init = {
  dmDeviceName: genFixedInt16Array(32),
  dmSpecVersion: W.WORD,
  dmDriverVersion: W.WORD,
  dmSize: W.WORD,
  dmDriverExtra: W.WORD,
  dmFields: W.DWORD,
  u1: {
    s1: {
      dmOrientation: W.SHORT,
      dmPaperSize: W.SHORT,
      dmPaperLength: W.SHORT,
      dmPaperWidth: W.SHORT,
      dmScale: W.SHORT,
      dmCopies: W.SHORT,
      dmDefaultSource: W.SHORT,
      dmPrintQuality: W.SHORT,
    },
    dmPosition: POINT_Factory,
    s2: {
      dmPosition: POINT_Factory,
      dmDisplayOrientation: W.DWORD,
      dmDisplayFixedOutput: W.DWORD,
    },
  },
  dmColor: W.SHORT,
  dmDuplex: W.SHORT,
  dmYResolution: W.SHORT,
  dmTTOption: W.SHORT,
  dmCollate: W.SHORT,
  dmFormName: genFixedInt16Array(32),
  dmLogPixels: W.WORD,
  dmBitsPerPel: W.DWORD,
  dmPelsWidth: W.DWORD,
  dmPelsHeight: W.DWORD,
  u2: {
    dmDisplayFlags: W.DWORD,
    dmNup: W.DWORD,
  },
  dmDisplayFrequency: W.DWORD,
  dmICMMethod: W.DWORD,
  dmICMIntent: W.DWORD,
  dmMediaType: W.DWORD,
  dmDitherType: W.DWORD,
  dmReserved1: W.DWORD,
  dmReserved2: W.DWORD,
  dmPanningWidth: W.DWORD,
  dmPanningHeight: W.DWORD,
} as const

/**
 * DEVMODEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
 */
export function DEVMODEW_Factory(): KoffiTypeResult {
  return genStruct(init, key, ptr)
}

/**
 * DEVMODEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
 */
export interface DEVMODEW_Type {
  dmDeviceName: M.WCHAR
  dmSpecVersion: M.WORD
  dmDriverVersion: M.WORD
  dmSize: M.WORD
  dmDriverExtra: M.WORD
  dmFields: M.DWORD
  u1: {
    s1: {
      dmOrientation: M.SHORT,
      dmPaperSize: M.SHORT,
      dmPaperLength: M.SHORT,
      dmPaperWidth: M.SHORT,
      dmScale: M.SHORT,
      dmCopies: M.SHORT,
      dmDefaultSource: M.SHORT,
      dmPrintQuality: M.SHORT,
    },
    dmPosition: POINT_Type,
    s2: {
      dmPosition: POINT_Type,
      dmDisplayOrientation: M.DWORD,
      dmDisplayFixedOutput: M.DWORD,
    },
  }
  dmColor: M.SHORT
  dmDuplex: M.SHORT
  dmYResolution: M.SHORT
  dmTTOption: M.SHORT
  dmCollate: M.SHORT
  dmFormName: M.WCHAR
  dmLogPixels: M.WORD
  dmBitsPerPel: M.DWORD
  dmPelsWidth: M.DWORD
  dmPelsHeight: M.DWORD
  u2: {
    dmDisplayFlags: M.DWORD,
    dmNup: M.DWORD,
  }
  dmDisplayFrequency: M.DWORD
  dmICMMethod: M.DWORD
  dmICMIntent: M.DWORD
  dmMediaType: M.DWORD
  dmDitherType: M.DWORD
  dmReserved1: M.DWORD
  dmReserved2: M.DWORD
  dmPanningWidth: M.DWORD
  dmPanningHeight: M.DWORD
}

export const LPDEVMODEW = ptr
export const DEVMODEW_Init = init

