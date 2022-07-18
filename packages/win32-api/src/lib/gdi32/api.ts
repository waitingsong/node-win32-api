/* eslint-disable id-length */
import * as M from 'win32-def'
import * as W from 'win32-def/common.def'


export interface Win32Fns {

  /**
   * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/nf-wingdi-createcompatibledc
   */
  CreateCompatibleDC: (hdc: M.HDC) => M.HDC
}


export const apiDef: M.DllFuncs<Win32Fns> = {

  CreateCompatibleDC: [W.HDC, [W.HDC] ],

}

