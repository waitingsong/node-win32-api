/* c8 ignore start */
import * as S from 'win32-def/struct'
import * as T from 'win32-def/types'

import { User32_E } from './E.types.js'


export class User32_F extends User32_E {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw */
  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND

  FlashWindow: (hWnd: T.HWND, bInvert: T.BOOL) => T.BOOL

  FlashWindowEx: (pfwi: S.FLASHWINFO_Type) => T.BOOL

}

/* c8 ignore stop */
