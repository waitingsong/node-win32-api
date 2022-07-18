/* eslint-disable id-length */
import * as M from 'win32-def'
import * as W from 'win32-def/common.def'


export interface Win32Fns {

  // CreateBitmap: (
  //   nWidth: M.INT,
  //   nHeight: M.INT,
  //   nPlanes: M.UINT,
  //   nBitCount: M.UINT,
  //   lpBits: M.LPVOID,
  // ) => M.HBITMAP

  /**
   * Creates a bitmap compatible with the device that is associated with the specified device context.
   * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatiblebitmap
   */
  CreateCompatibleBitmap: (
    hdc: M.HDC,
    cx: M.INT,
    cy: M.INT
  ) => M.HBITMAP

  /**
   * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatibledc
   */
  CreateCompatibleDC: (hdc: M.HDC) => M.HDC
}


export const apiDef: M.DllFuncs<Win32Fns> = {

  // CreateBitmap: [W.HBITMAP, [W.INT, W.INT, W.UINT, W.UINT, W.VOID] ],

  CreateCompatibleBitmap: [W.HBITMAP, [W.HDC, W.INT, W.INT] ],

  CreateCompatibleDC: [W.HDC, [W.HDC] ],

}

