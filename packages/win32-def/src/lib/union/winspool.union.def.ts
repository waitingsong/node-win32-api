import { DWORD, SHORT } from '../common.def.js'
import { StructType } from '../helper.js'
import { POINTL } from '../struct/struct.def.js'


const DEVMODEW_DUMMYSTRUCTNAME = {
  dmOrientation: SHORT,
  dmPaperSize: SHORT,
  dmPaperLength: SHORT,
  dmPaperWidth: SHORT,
  dmScale: SHORT,
  dmCopies: SHORT,
  dmDefaultSource: SHORT,
  dmPrintQuality: SHORT,
}
const DEVMODEW_DUMMYSTRUCTNAME2 = {
  dmPosition: StructType(POINTL),
  dmDisplayOrientation: DWORD,
  dmDisplayFixedOutput: DWORD,
}
export const DEVMODEW_DUMMYUNIONNAME = {
  DUMMYSTRUCTNAME: StructType(DEVMODEW_DUMMYSTRUCTNAME),
  dmPosition: StructType(POINTL),
  DUMMYSTRUCTNAME2: StructType(DEVMODEW_DUMMYSTRUCTNAME2),
}
export const DEVMODEW_DUMMYUNIONNAME2 = {
  dmDisplayFlags: DWORD,
  dmNup: DWORD,
}

