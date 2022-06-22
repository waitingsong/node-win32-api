import * as DStructExt from './data-struct-ext/index.js'
import * as Comctl32 from './lib/comctl32/index.js'
import * as Kernel32 from './lib/kernel32/index.js'
import * as Ntdll from './lib/ntdll/index.js'
import * as User32 from './lib/user32/index.js'
import * as Constants from './lib/winmsg.js'


export {
  Config,
  DModel, // model of window data types
  DStruct, // window data types of structure
  DTypes, // window data types
  FModel, // ffi model
} from 'win32-def'

export { DStructExt }

export { User32 as U }
export { User32 }

export { Kernel32 as K }
export { Kernel32 }

export { Comctl32 as C }
export { Comctl32 }

export { Ntdll }

export * from './lib/model.js'
export * from './lib/fixed-buffer.js'

export { Constants }
export { Constants as CS }

