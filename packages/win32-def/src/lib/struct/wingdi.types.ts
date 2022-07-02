import {
  _POINTER,
  DWORD,
  LONG,
  StructInstanceBase,
  UINT32,
  WCHAR_String,
} from '../common.types.js'


/** https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew */
export interface DISPLAY_DEVICEW extends StructInstanceBase {
  cb: DWORD
  DeviceName: WCHAR_String
  DeviceString: WCHAR_String
  StateFlags: DWORD
  DeviceID: WCHAR_String
  DeviceKey: WCHAR_String
}
/** A pointer to DISPLAY_DEVICEW  */
export type PDISPLAY_DEVICEW = _POINTER
/** A pointer to DISPLAY_DEVICEW  */
export type LPDISPLAY_DEVICEW = _POINTER


/**
 * Describes a local identifier for an adapter.
 * @description The LUID structure stores the video port identifier.
 * This structure is stored in the PortId member of the `KSJACK_SINK_INFORMATION` structure.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winnt/ns-winnt-luid
 */
export interface LUID extends StructInstanceBase {
  LowPart: DWORD
  HighPart: LONG
}
/** A pointer to LUID  */
export type PLUID = _POINTER

/**
 * Contains source information for a single path.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-displayconfig_path_source_info
 */
export interface DISPLAYCONFIG_PATH_SOURCE_INFO {
  adapterId: LUID
  id: UINT32
  // union {
  //   UINT32 modeInfoIdx;
  //   struct {
  //     UINT32 cloneGroupId: 16;
  //     UINT32 sourceModeInfoIdx: 16
  //    } DUMMYSTRUCTNAME;
  // } DUMMYUNIONNAME;
  statusFlags: UINT32
}
export type PDISPLAYCONFIG_PATH_SOURCE_INFO = _POINTER

/**
 * Describe a single path from a target to a source.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ns-wingdi-displayconfig_path_info
 */
export interface DISPLAYCONFIG_PATH_INFO {
  sourceInfo: DISPLAYCONFIG_PATH_SOURCE_INFO
  // targetInfo: DISPLAYCONFIG_PATH_TARGET_INFO,
  flags: UINT32
}
export type PDISPLAYCONFIG_PATH_INFO = _POINTER

