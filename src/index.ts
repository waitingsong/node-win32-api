/**
 * node-win32-api
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */
export {
  DModel, // model of window data types
  DStruct, // window data types of structure
  DTypes, // window data types
  FModel, // ffi model
} from 'win32-def'

import * as User32 from './lib/user32/index'
export { User32 as U }
export { User32 }

import * as Kernel32 from './lib/kernel32/index'
export { Kernel32 as K }
export { Kernel32 }

import * as Comctl32 from './lib/comctl32/index'
export { Comctl32 as C }
export { Comctl32 }

import * as Ntdll from './lib/ntdll/index'
export { Ntdll }

export * from './lib/model'
