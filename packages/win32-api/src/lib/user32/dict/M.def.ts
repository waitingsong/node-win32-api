import * as D from 'win32-def/def'

import { DefUser32_I } from './I.def.js'


export class DefUser32_M extends DefUser32_I {

  static MonitorFromWindow = [D.HWND, [D.HANDLE, D.DWORD]]

}
