import { DWORD } from '../common.def.js'
import { UnionType } from '../helper.js'
import { RID_DEVICE_INFO_DUMMYUNIONNAME } from '../union/union.def.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rid_device_info */
export const RID_DEVICE_INFO = {
  cbSize: DWORD,
  dwType: DWORD,
  DUMMYUNIONNAME: UnionType(RID_DEVICE_INFO_DUMMYUNIONNAME),
} as const

