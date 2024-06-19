import * as Comctl32 from './lib/comctl32/index.js'
import * as Gdi32 from './lib/gdi32/index.js'
import * as Kernel32 from './lib/kernel32/index.js'
import * as Ntdll from './lib/ntdll/index.js'
import * as Spoolss from './lib/spoolss/index.js'
import * as User32 from './lib/user32/index.js'
import * as Constants from './lib/winmsg.js'
import * as Winspool from './lib/winspool/index.js'


export {
  config,
  Config,
} from 'win32-def'
/** model of window data types */
export * as Types from 'win32-def'
/** window data types of structure */
export * as Struct from 'win32-def/struct'
/** window data types */
export * as Def from 'win32-def/def'


export { Gdi32 }

export { User32 as U }
export { User32 }

export { Kernel32 as K }
export { Kernel32 }

export { Comctl32 as C }
export { Comctl32 }

export { Ntdll }

export { Spoolss }
export { Winspool }

export * from './lib/types.js'

export { Constants }
export { Constants as CS }

export * from './lib/helper.js'


