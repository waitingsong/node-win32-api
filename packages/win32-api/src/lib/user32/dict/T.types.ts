/* c8 ignore start */
import * as S from 'win32-def/struct'
import * as T from 'win32-def/types'

import { User32_S } from './S.types.js'


export class User32_T extends User32_S {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-translatemessage */
  TranslateMessage: (lpMsg: S.MSG_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/winmsg/translatemessageex */
  TranslateMessageEx: (lpMsg: S.MSG_Type) => T.BOOL

}

/* c8 ignore stop */
