/**
 * node-win32-def
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */
import ffi from 'koffi'


export * from './lib/config.js'
export * from './lib/def.enum.js'

export type * from './lib/common.types.js'
export * from './lib/loader/loader.js'
export * from './lib/ffi.types.js'
export * from './lib/struct/struct.helper.js'
export * from './lib/struct/struct.factory-map.js'
export type * from './lib/types.js'
export * from './lib/util.js'

export { ffi }

