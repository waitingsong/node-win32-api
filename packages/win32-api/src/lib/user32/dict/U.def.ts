import * as D from 'win32-def/def'

import { DefUser32_T } from './T.def.js'


export class DefUser32_U extends DefUser32_T {

  static UnhookWinEvent = [D.BOOL, [D.HWINEVENTHOOK]]

  static UpdateWindow = [D.BOOL, [D.HWND]]

}

