/* c8 ignore start */
import * as T from 'win32-def/types'

import { User32_T } from './T.types.js'


export class User32_U extends User32_T {

  UnhookWinEvent: (hWinEventHook: T.HWINEVENTHOOK) => T.BOOL

  UpdateWindow: (hWnd: T.HWND) => T.BOOL

}

/* c8 ignore stop */
