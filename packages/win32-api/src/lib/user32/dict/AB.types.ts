/* c8 ignore start */
import type * as T from 'win32-def/types'

import type { DefUser32_B } from './AB.def.js'


export class User32_B implements T.LibDef2Type<typeof DefUser32_B> {

  BringWindowToTop: (hWnd: T.HWND) => T.BOOL
  /**
   * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-broadcastsystemmessage
   */
  BroadcastSystemMessage: (
    flags: T.DWORD,
    lpInfo: T.LPDWORD,
    Msg: T.UINT,
    wParam: T.WPARAM,
    lParam: T.LPARAM) => T.LRESULT

}

/* c8 ignore stop */
