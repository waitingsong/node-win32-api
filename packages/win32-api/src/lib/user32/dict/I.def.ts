import * as D from 'win32-def/def'

import { DefUser32_G } from './G.def.js'


export class DefUser32_I extends DefUser32_G {

  static IsIconic = [D.BOOL, [D.HWND]]

  static IsWindowVisible = [D.BOOL, [D.HWND]]

}

