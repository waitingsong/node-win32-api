import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_S } from './S.def.js'


export class DefUser32_T extends DefUser32_S {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-translatemessage */
  static TranslateMessage = [D.BOOL, [S.LPMSG]]

  /** https://learn.microsoft.com/en-us/windows/win32/winmsg/translatemessageex */
  static TranslateMessageEx = [D.BOOL, [S.LPMSG]]

}

export class DefUser32_U extends DefUser32_T {

  static UnhookWinEvent = [D.BOOL, [D.HWINEVENTHOOK]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-unregisterclassw */
  static UnregisterClassW = [D.BOOL, [D.WString, D.HINSTANCE]]

  static UpdateWindow = [D.BOOL, [D.HWND]]

}

