import {
  _POINTER,
  DWORD,
  StructInstanceBase,
  WCHAR_String,
  WORD,
  SHORT,
} from '../common.types.js'
import { DEVMODEW_DUMMYUNIONNAME, DEVMODEW_DUMMYUNIONNAME2 } from '../union/winspool.union.types.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export interface DISPLAY_DEVICEW extends StructInstanceBase {
  cb: DWORD
  DeviceName: WCHAR_String
  DeviceString: WCHAR_String
  StateFlags: DWORD
  DeviceID: WCHAR_String
  DeviceKey: WCHAR_String
}
/** A pointer to DISPLAY_DEVICEW  */
export type PDISPLAY_DEVICEW = _POINTER
/** A pointer to DISPLAY_DEVICEW  */
export type LPDISPLAY_DEVICEW = _POINTER


/**
 * Used for specifying characteristics of display and print devices in the Unicode (wide) character set.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-devmodew
 */
export interface DEVMODEW extends StructInstanceBase {
  dmDeviceName: WCHAR_String
  dmSpecVersion: WORD
  dmDriverVersion: WORD
  dmSize: WORD
  dmDriverExtra: WORD
  dmFields: DWORD
  // union {
  //   struct {
  //     short dmOrientation;
  //     short dmPaperSize;
  //     short dmPaperLength;
  //     short dmPaperWidth;
  //     short dmScale;
  //     short dmCopies;
  //     short dmDefaultSource;
  //     short dmPrintQuality
  //   } DUMMYSTRUCTNAME;
  //   dmPosition: POINTL
  //   struct {
  //     POINTL dmPosition;
  //     DWORD  dmDisplayOrientation;
  //     DWORD  dmDisplayFixedOutput
  //     } DUMMYSTRUCTNAME2
  // } DUMMYUNIONNAME;
  DUMMYUNIONNAME: DEVMODEW_DUMMYUNIONNAME
  dmColor: SHORT
  dmDuplex: SHORT
  dmYResolution: SHORT
  dmTTOption: SHORT
  dmCollate: SHORT
  /**
   * For printers, specifies the name of the form to use; such as "Letter" or "Legal".
   * This must be a name that can be obtain by calling the Win32 EnumForms function
   * (described in the Microsoft Window SDK documentation).
   */
  dmFormName: WCHAR_String
  dmLogPixels: WORD
  dmBitsPerPel: DWORD
  dmPelsWidth: DWORD
  dmPelsHeight: DWORD
  // union {
  //   DWORD dmDisplayFlags;
  //   DWORD dmNup
  // } DUMMYUNIONNAME2;
  DUMMYUNIONNAME2: DEVMODEW_DUMMYUNIONNAME2
  dmDisplayFrequency: DWORD
  dmICMMethod: DWORD
  dmICMIntent: DWORD
  dmMediaType: DWORD
  dmDitherType: DWORD
  dmReserved1: DWORD
  dmReserved2: DWORD
  dmPanningWidth: DWORD
  dmPanningHeight: DWORD
}
export type PDEVMODEW = _POINTER
export type NPDEVMODEW = _POINTER
export type LPDEVMODEW = _POINTER
