/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable id-length */
// windows data types struct for ref-struct module https://github.com/TooTallNate/ref-struct
import {
  DTypes as W,
  DUnion as DU,
} from 'win32-def'

import { Union } from '../lib/shared'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rid_device_info */
export const RID_DEVICE_INFO = {
  cbSize: W.DWORD,
  dwType: W.DWORD,
  DUMMYUNIONNAME: Union(DU.RID_DEVICE_INFO_DUMMYUNIONNAME),
}

