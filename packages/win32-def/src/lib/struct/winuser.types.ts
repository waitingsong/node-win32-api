import {
  DWORD,
  StructInstanceBase,
  _POINTER,
} from '../common.types.js'
import { RID_DEVICE_INFO_DUMMYUNIONNAME } from '../union/union.types.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rid_device_info */
export interface RID_DEVICE_INFO extends StructInstanceBase {
  cbSize: DWORD
  dwType: DWORD
  // DUMMYUNIONNAME: BufferType
  DUMMYUNIONNAME: RID_DEVICE_INFO_DUMMYUNIONNAME
}
export type PRID_DEVICE_INFO = _POINTER

