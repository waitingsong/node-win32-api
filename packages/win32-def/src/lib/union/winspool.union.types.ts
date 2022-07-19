import {
  DWORD,
  SHORT,
  StructInstanceBase,
  UnionInstanceBase,
} from '../common.types.js'
import { POINTL } from '../struct/struct.types.js'


export interface DEVMODEW_DUMMYUNIONNAME extends UnionInstanceBase {
  DUMMYSTRUCTNAME: DEVMODEW_DUMMYSTRUCTNAME
  dmPosition: POINTL
  DUMMYSTRUCTNAME2: DEVMODEW_DUMMYSTRUCTNAME2
}
interface DEVMODEW_DUMMYSTRUCTNAME extends StructInstanceBase {
  dmOrientation: SHORT
  dmPaperSize: SHORT
  dmPaperLength: SHORT
  dmPaperWidth: SHORT
  dmScale: SHORT
  dmCopies: SHORT
  dmDefaultSource: SHORT
  dmPrintQuality: SHORT
}
interface DEVMODEW_DUMMYSTRUCTNAME2 extends StructInstanceBase {
  dmPosition: POINTL
  dmDisplayOrientation: DWORD
  dmDisplayFixedOutput: DWORD
}
export interface DEVMODEW_DUMMYUNIONNAME2 extends UnionInstanceBase {
  dmDisplayFlags: DWORD
  dmNup: DWORD
}
