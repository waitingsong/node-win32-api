import {
  DWORD,
  HWND,
  StructInstanceBase,
  UINT,
  _POINTER,
} from '../common.types.js'
import { RID_DEVICE_INFO_DUMMYUNIONNAME } from '../union/union.types.js'


/**
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export interface FLASHWINFO extends StructInstanceBase {
  cbSize: UINT
  hwnd: HWND
  dwFlags: DWORD
  uCount: UINT
  dwTimeout: DWORD
}
export type PFLASHWINFO = _POINTER


/** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/ns-winuser-rid_device_info */
export interface RID_DEVICE_INFO extends StructInstanceBase {
  cbSize: DWORD
  dwType: DWORD
  // DUMMYUNIONNAME: BufferType
  DUMMYUNIONNAME: RID_DEVICE_INFO_DUMMYUNIONNAME
}
export type PRID_DEVICE_INFO = _POINTER

