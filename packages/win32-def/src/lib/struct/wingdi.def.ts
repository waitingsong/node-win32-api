import { DWORD, SHORT, WORD } from '../common.def.js'
import { wcharBuffer } from '../fixed-buffer.js'
import { UnionType } from '../helper.js'
import {
  DEVMODEW_DUMMYUNIONNAME,
  DEVMODEW_DUMMYUNIONNAME2,
} from '../union/winspool.union.def.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export const DISPLAY_DEVICEW = {
  cb: DWORD,
  DeviceName: wcharBuffer(32),
  DeviceString: wcharBuffer(128),
  StateFlags: DWORD,
  DeviceID: wcharBuffer(128),
  DeviceKey: wcharBuffer(128),
}


/**
 * Used for specifying characteristics of display and print devices in the Unicode (wide) character set.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
 */
export const DEVMODEW = {
  dmDeviceName: wcharBuffer(128),
  dmSpecVersion: WORD,
  dmDriverVersion: WORD,
  dmSize: WORD,
  dmDriverExtra: WORD,
  dmFields: DWORD,
  DUMMYUNIONNAME: UnionType(DEVMODEW_DUMMYUNIONNAME),
  dmColor: SHORT,
  dmDuplex: SHORT,
  dmYResolution: SHORT,
  dmTTOption: SHORT,
  dmCollate: SHORT,
  /**
   * For printers, specifies the name of the form to use; such as "Letter" or "Legal".
   * This must be a name that can be obtain by calling the Win32 EnumForms function
   * (described in the Microsoft Window SDK documentation).
   */
  dmFormName: wcharBuffer(32),
  dmLogPixels: WORD,
  dmBitsPerPel: DWORD,
  dmPelsWidth: DWORD,
  dmPelsHeight: DWORD,
  DUMMYUNIONNAME2: UnionType(DEVMODEW_DUMMYUNIONNAME2),
  dmDisplayFrequency: DWORD,
  dmICMMethod: DWORD,
  dmICMIntent: DWORD,
  dmMediaType: DWORD,
  dmDitherType: DWORD,
  dmReserved1: DWORD,
  dmReserved2: DWORD,
  dmPanningWidth: DWORD,
  dmPanningHeight: DWORD,
}


