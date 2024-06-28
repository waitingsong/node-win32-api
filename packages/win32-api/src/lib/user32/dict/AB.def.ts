import * as D from 'win32-def/def'


export class DefUser32_B {

  static BringWindowToTop = [D.BOOL, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-broadcastsystemmessage */
  static BroadcastSystemMessage = [D.LRESULT, [D.DWORD, D.LPDWORD, D.UINT, D.WPARAM, D.LPARAM]]

}

