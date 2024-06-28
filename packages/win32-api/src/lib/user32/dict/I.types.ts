/* c8 ignore start */
import * as T from 'win32-def/types'

import { User32_G } from './G.types.js'


export class User32_I extends User32_G {

  IsIconic: (hWnd: T.HWND) => T.BOOL

  IsWindowVisible: (hWnd: T.HWND) => T.BOOL

}

/* c8 ignore stop */
