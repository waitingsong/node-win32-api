/* eslint-disable id-length */
// windows data types struct for ref-struct module https://github.com/TooTallNate/ref-struct
import { DTypes as W } from 'win32-def'

import { BufferTypeFactory } from '../lib/fixed-buffer'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export const DISPLAY_DEVICEW = {
  cb: W.DWORD,
  DeviceName: BufferTypeFactory(32, 'ucs2'),
  DeviceString: BufferTypeFactory(128, 'ucs2'),
  StateFlags: W.DWORD,
  DeviceID: BufferTypeFactory(128, 'ucs2'),
  DeviceKey: BufferTypeFactory(128, 'ucs2'),
}

