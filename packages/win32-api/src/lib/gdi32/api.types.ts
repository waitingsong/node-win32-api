import * as T from 'win32-def'


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
    hdc: T.HDC,
    cx: T.INT,
    cy: T.INT
  ) => T.HBITMAP

  /**
   * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatibledc
   */
  CreateCompatibleDC: (hdc: T.HDC) => T.HDC
}
