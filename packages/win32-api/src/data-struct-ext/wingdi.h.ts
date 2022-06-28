/* eslint-disable id-length */
// windows data types struct for ref-struct module https://github.com/TooTallNate/ref-struct
import { DTypes as W } from 'win32-def'

import { wcharBuffer } from '../lib/fixed-buffer.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export const DISPLAY_DEVICEW = {
  cb: W.DWORD,
  DeviceName: wcharBuffer(32),
  DeviceString: wcharBuffer(128),
  StateFlags: W.DWORD,
  DeviceID: wcharBuffer(128),
  DeviceKey: wcharBuffer(128),
}

