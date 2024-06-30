/* c8 ignore start */
import type * as T from 'win32-def/types'

import { User32_G } from './G.types.js'


export class User32_I extends User32_G {

  IsIconic: (hWnd: T.HWND) => T.BOOL

  IsWindowVisible: (hWnd: T.HWND) => T.BOOL

}

export class User32_M extends User32_I {

  /**
   * @learn https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-monitorfromwindow
   */
  MonitorFromWindow: (hWnd: T.HWND, dwFlags: T.DWORD) => T.HMONITOR

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messageboxexw */
  MessageBoxExW: (
    hWnd: T.HWND,
    lpText: T.WString | null,
    lpCaption: T.WString | null,
    uType: T.UINT,
    wLanguageId: T.WORD,
  ) => T.INT

}

/* c8 ignore stop */
