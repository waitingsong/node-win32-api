import { DWORD, LONG, UINT32 } from '../common.def.js'
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


/**
 * Describes a local identifier for an adapter.
 * @description The LUID structure stores the video port identifier.
 * This structure is stored in the PortId member of the `KSJACK_SINK_INFORMATION` structure.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-luid
 */
export const LUID = {
  LowPart: DWORD,
  HighPart: LONG,
}
/**
 * Contains source information for a single path.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-displayconfig_path_source_info
 */
export const DISPLAYCONFIG_PATH_SOURCE_INFO = {
  adapterId: LUID,
  id: UINT32,
  //   union {
  //     UINT32 modeInfoIdx;
  //     struct {
  //       UINT32 cloneGroupId: 16;
  //       UINT32 sourceModeInfoIdx: 16
  //      } DUMMYSTRUCTNAME;
  //   } DUMMYUNIONNAME;
  statusFlags: UINT32,
}
/**
 * Describe a single path from a target to a source.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-displayconfig_path_info
 */
export const DISPLAYCONFIG_PATH_INFO = {
  sourceInfo: DISPLAYCONFIG_PATH_SOURCE_INFO,
  // targetInfo: DISPLAYCONFIG_PATH_TARGET_INFO,
  flags: UINT32,
}

