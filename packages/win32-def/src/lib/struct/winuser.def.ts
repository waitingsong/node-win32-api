import { DWORD } from '../common.def.js'
import { UnionType } from '../helper.js'
import { RID_DEVICE_INFO_DUMMYUNIONNAME } from '../union/union.def.js'
// import * as UT from '../union/union.types.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rid_device_info */
export const RID_DEVICE_INFO = {
  cbSize: DWORD,
  dwType: DWORD,
  // DUMMYUNIONNAME: UnionType<UT.RID_DEVICE_INFO_DUMMYUNIONNAME>(RID_DEVICE_INFO_DUMMYUNIONNAME),
  DUMMYUNIONNAME: UnionType(RID_DEVICE_INFO_DUMMYUNIONNAME),
} as const

