/**
 * node-win32-api
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as Config from './lib/config'
import * as FModel from './lib/ffi.model'
import { parse_windef } from './lib/helper'
import { macroMap } from './lib/marcomap'
import * as DStruct from './lib/struct'
import * as DModel from './lib/win.model'
import * as windef from './lib/windef'

const DTypes = <typeof windef> parse_windef(windef, macroMap)

export { Config }
export { FModel }
export { DModel }
export { DStruct }
export { DTypes }
