import { DWORD } from './common'


export interface UnionInstanceBase {
  ref: () => Buffer
}

export interface RID_DEVICE_INFO_DUMMYUNIONNAME extends UnionInstanceBase {
  mouse: DWORD
  keyboard: DWORD
  hid: DWORD
}

