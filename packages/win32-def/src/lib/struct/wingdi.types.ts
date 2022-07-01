import {
  _POINTER,
  DWORD,
  StructInstanceBase,
  WCHAR_String,
} from '../common.types.js'


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

