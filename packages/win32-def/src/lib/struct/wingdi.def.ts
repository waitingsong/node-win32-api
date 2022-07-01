import { DWORD } from '../common.def.js'
import { wcharBuffer } from '../fixed-buffer.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export const DISPLAY_DEVICEW = {
  cb: DWORD,
  DeviceName: wcharBuffer(32),
  DeviceString: wcharBuffer(128),
  StateFlags: DWORD,
  DeviceID: wcharBuffer(128),
  DeviceKey: wcharBuffer(128),
}

