/**
 * node-win32-def
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-def
 */

import * as Config from './lib/config'
import * as DStruct from './lib/data-struct'
import * as DUnion from './lib/data-union'
import * as FModel from './lib/ffi.model'
import { parse_windef } from './lib/helper'
import { macroMap } from './lib/marcomap'
import * as DModel from './lib/win.model'
import * as windef from './lib/windef'


const DTypes = parse_windef(windef, macroMap) as typeof windef

export { Config }
export { FModel } // ffi model
export { DModel } // model of window data types
export { DStruct } // window constans data types of structure for ref-struct
export { DUnion } // window constans data types of union for ref-union
export { DTypes } // window data types

