/**
 * node-win32-def
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as Config from './lib/config.js'
import * as DStruct from './lib/data-struct.js'
import * as DUnion from './lib/data-union.js'
import * as FModel from './lib/ffi.model.js'
import { parse_windef } from './lib/helper.js'
import { macroMap } from './lib/marcomap.js'
import * as DModel from './lib/win.model.js'
import * as windef from './lib/windef.js'


const DTypes = parse_windef(windef, macroMap) as typeof windef

export { Config }
export { FModel } // ffi model
export { DModel } // model of window data types
export { DStruct } // window constans data types of structure for ref-struct
export { DUnion } // window constans data types of union for ref-union
export { DTypes } // window data types

export {
  parse_windef,
  lookupRef,
  isValidDataDef,
  validateWinData,
} from './lib/helper.js'
