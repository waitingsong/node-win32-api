/**
 * node-win32-api
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */

import { parse_windef } from './lib/helper'

import * as windef from './lib/windef'
const dataTypes = parse_windef(windef)   // must at top convert types Windef to WinData
export {dataTypes}

import * as Config from './lib/config'
export {Config as config}

import * as WStruct from './lib/struct'
export {WStruct}

import * as WModel from './lib/model'
export {WModel}

