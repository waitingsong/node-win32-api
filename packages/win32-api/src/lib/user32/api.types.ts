/* c8 ignore start */
import type * as T from 'win32-def/types'

import type { DefUser32 } from './api.def.js'
import { User32Combo } from './dict/index.types.js'


export class User32 extends User32Combo implements T.LibDef2Type<typeof DefUser32 > {
}


/* c8 ignore stop */
