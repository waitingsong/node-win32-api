/* c8 ignore start */
import * as T from 'win32-def/types'

import { User32_I } from './I.types.js'


export class User32_M extends User32_I {

  /**
   * @learn https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-monitorfromwindow
   */
  MonitorFromWindow: (hWnd: T.HWND, dwFlags: T.DWORD) => T.HMONITOR

}

/* c8 ignore stop */
