import type * as T from 'win32-def/types'

import { DefUser32Combo } from './dict/index.def.js'


export class DefUser32 extends DefUser32Combo implements T.LibDefBase {
  [x: string]: T.FnDefFullParams
}

