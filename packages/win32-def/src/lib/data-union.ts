/* eslint-disable id-length */
// windows data types struct for ref-union module https://github.com/TooTallNate/ref-union

import { parse_windef } from './helper.js'
import { macroMap } from './marcomap.js'
import * as windef from './windef.js'


const W = parse_windef(windef, macroMap) as typeof windef


export const RID_DEVICE_INFO_DUMMYUNIONNAME = {
  mouse: W.INT,
  keyboard: W.INT,
  hid: W.INT,
}

