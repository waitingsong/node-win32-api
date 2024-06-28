/* c8 ignore start */
import * as S from 'win32-def/struct'
import * as T from 'win32-def/types'

import { User32_P } from './P.types.js'


export class User32_R extends User32_P {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-registerclassexw */
  RegisterClassExW: (lpwcx: S.WNDCLASSEXW_Type) => T.ATOM

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew */
  RegisterWindowMessageW: (lpString: T.LPCWSTR) => T.UINT

}

/* c8 ignore stop */
