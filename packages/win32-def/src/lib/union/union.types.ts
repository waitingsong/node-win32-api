import { DWORD, UnionInstanceBase } from '../common.types.js'


export interface RID_DEVICE_INFO_DUMMYUNIONNAME extends UnionInstanceBase {
  mouse: DWORD
  keyboard: DWORD
  hid: DWORD
}

