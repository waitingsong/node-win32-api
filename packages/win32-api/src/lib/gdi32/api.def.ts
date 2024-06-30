import * as D from 'win32-def/def'
import type * as T from 'win32-def/types'


export class DefGdi32 implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  // static  CreateBitmap = [W.HBITMAP, [W.INT, W.INT, W.UINT, W.UINT, W.VOID] ]

  /** https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatiblebitmap */
  static CreateCompatibleBitmap = [D.HBITMAP, [D.HDC, D.INT, D.INT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatibledc */
  static CreateCompatibleDC = [D.HDC, [D.HDC]]

}
