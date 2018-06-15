// dict of parsed windef value
import { parse_windef } from './helper'
import * as GT from './types'
import * as windefSrc from './windef'


const windef = <GT.WinData> parse_windef(windefSrc)   // must at top convert types Windef to WinData

export default windef
