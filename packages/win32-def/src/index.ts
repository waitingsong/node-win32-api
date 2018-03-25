/**
 * node-win32-api
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as Config from './lib/config'
import { parse_windef } from './lib/helper'
import { macroMap } from './lib/marcomap'
import * as DModel from './lib/model'
import * as DStruct from './lib/struct'
import * as windef from './lib/windef'

const DTypes = <typeof windef> parse_windef(windef, macroMap)

export {DModel}
export {Config}
export {DStruct}
export {DTypes}
