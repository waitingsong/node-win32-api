import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {

  // CreateBitmap: [W.HBITMAP, [W.INT, W.INT, W.UINT, W.UINT, W.VOID] ],

  CreateCompatibleBitmap: [D.HBITMAP, [D.HDC, D.INT, D.INT]],

  CreateCompatibleDC: [D.HDC, [D.HDC]],

}

