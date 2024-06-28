/* c8 ignore start */
import * as T from 'win32-def/types'

import { User32_B } from './B.types.js'


export class User32_C extends User32_B {

  ClientToScreen: (hWnd: T.HWND, lpPoint: T.LPPOINT) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-closewindow */
  CloseWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowexw */
  CreateWindowExW: (
    dwExStyle: T.DWORD,
    lpClassName: T.LPCTSTR | null,
    lpWindowName: T.LPCTSTR | null,
    dwStyle: T.DWORD,
    x: T.INT,
    y: T.INT,
    nWidth: T.INT,
    nHeight: T.INT,
    hWndParent: T.HWND,
    HMENU: T.HMENU,
    HINSTANCE: T.HINSTANCE,
    LPVOID: T.LPVOID,
  ) => T.HWND

}

/* c8 ignore stop */
