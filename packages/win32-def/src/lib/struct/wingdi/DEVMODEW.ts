import * as D from '##/lib/common.def.js'
import type * as T from '##/lib/common.types.js'
import type { StructFactoryResult, StructInitType } from '##/lib/types.js'

import { genFixedInt16Array, genStruct } from '../struct.helper.js'
import { POINT_Factory } from '../windef/POINT.js'
import type { POINT_Type } from '../windef/POINT.js'


const key = 'DEVMODEW'
const ptr = `${key}*` as const
const init: StructInitType = {
  dmDeviceName: genFixedInt16Array(32),
  dmSpecVersion: D.WORD,
  dmDriverVersion: D.WORD,
  dmSize: D.WORD,
  dmDriverExtra: D.WORD,
  dmFields: D.DWORD,
  u1: {
    s1: {
      dmOrientation: D.SHORT,
      dmPaperSize: D.SHORT,
      dmPaperLength: D.SHORT,
      dmPaperWidth: D.SHORT,
      dmScale: D.SHORT,
      dmCopies: D.SHORT,
      dmDefaultSource: D.SHORT,
      dmPrintQuality: D.SHORT,
    },
    dmPosition: POINT_Factory,
    s2: {
      dmPosition: POINT_Factory,
      dmDisplayOrientation: D.DWORD,
      dmDisplayFixedOutput: D.DWORD,
    },
  },
  dmColor: D.SHORT,
  dmDuplex: D.SHORT,
  dmYResolution: D.SHORT,
  dmTTOption: D.SHORT,
  dmCollate: D.SHORT,
  dmFormName: genFixedInt16Array(32),
  dmLogPixels: D.WORD,
  dmBitsPerPel: D.DWORD,
  dmPelsWidth: D.DWORD,
  dmPelsHeight: D.DWORD,
  u2: {
    dmDisplayFlags: D.DWORD,
    dmNup: D.DWORD,
  },
  dmDisplayFrequency: D.DWORD,
  dmICMMethod: D.DWORD,
  dmICMIntent: D.DWORD,
  dmMediaType: D.DWORD,
  dmDitherType: D.DWORD,
  dmReserved1: D.DWORD,
  dmReserved2: D.DWORD,
  dmPanningWidth: D.DWORD,
  dmPanningHeight: D.DWORD,
} as const

export const LPDEVMODEW = ptr
export const DEVMODEW_Name = key
export const DEVMODEW_Init: typeof init = init


/**
 * DEVMODEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
 */
export function DEVMODEW_Factory(): StructFactoryResult<DEVMODEW_Type> {
  return genStruct<DEVMODEW_Type>(init, key, ptr, ['dmSize'])
}

/**
 * DEVMODEW structure
 * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
 */
export interface DEVMODEW_Type {
  dmDeviceName: T.WCHAR
  dmSpecVersion: T.WORD
  dmDriverVersion: T.WORD
  dmSize: T.WORD
  dmDriverExtra: T.WORD
  dmFields: T.DWORD
  u1: {
    s1: {
      dmOrientation: T.SHORT,
      dmPaperSize: T.SHORT,
      dmPaperLength: T.SHORT,
      dmPaperWidth: T.SHORT,
      dmScale: T.SHORT,
      dmCopies: T.SHORT,
      dmDefaultSource: T.SHORT,
      dmPrintQuality: T.SHORT,
    },
    dmPosition: POINT_Type,
    s2: {
      dmPosition: POINT_Type,
      dmDisplayOrientation: T.DWORD,
      dmDisplayFixedOutput: T.DWORD,
    },
  }
  dmColor: T.SHORT
  dmDuplex: T.SHORT
  dmYResolution: T.SHORT
  dmTTOption: T.SHORT
  dmCollate: T.SHORT
  dmFormName: T.WCHAR
  dmLogPixels: T.WORD
  dmBitsPerPel: T.DWORD
  dmPelsWidth: T.DWORD
  dmPelsHeight: T.DWORD
  u2: {
    dmDisplayFlags: T.DWORD,
    dmNup: T.DWORD,
  }
  dmDisplayFrequency: T.DWORD
  dmICMMethod: T.DWORD
  dmICMIntent: T.DWORD
  dmMediaType: T.DWORD
  dmDitherType: T.DWORD
  dmReserved1: T.DWORD
  dmReserved2: T.DWORD
  dmPanningWidth: T.DWORD
  dmPanningHeight: T.DWORD
}

