/* c8 ignore start */
import type * as T from 'win32-def/types'

import type { DefGdi32 } from './api.def.js'


export class Gdi32 implements T.LibDef2Type<typeof DefGdi32> {

  // CreateBitmap: (
  //   nWidth: M.INT,
  //   nHeight: M.INT,
  //   nPlanes: M.UINT,
  //   nBitCount: M.UINT,
  //   lpBits: M.LPVOID,
  // ) => M.HBITMAP

  /**
   * Creates a bitmap compatible with the device that is associated with the specified device context.
   * @link https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatiblebitmap
   */
  CreateCompatibleBitmap: (
    hdc: T.HDC,
    cx: T.INT,
    cy: T.INT
  ) => T.HBITMAP

  /** https://learn.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatibledc */
  CreateCompatibleDC: (hdc: T.HDC) => T.HDC
}

/* c8 ignore stop */
