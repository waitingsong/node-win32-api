/**
 * node-win32-api
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */
export {
  Config,
  DModel, // model of window data types
  DStruct, // window data types of structure
  DTypes, // window data types
  FModel, // ffi model
} from 'win32-def'

import * as Comctl32 from './lib/comctl32/index'
import * as Kernel32 from './lib/kernel32/index'
import * as Ntdll from './lib/ntdll/index'
import * as User32 from './lib/user32/index'

export { User32 as U }
export { User32 }

export { Kernel32 as K }
export { Kernel32 }

export { Comctl32 as C }
export { Comctl32 }

export { Ntdll }

export * from './lib/model'
