import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_F } from './EF.def.js'


export class DefUser32_G extends DefUser32_F {

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getancestor */
  static GetAncestor = [D.HWND, [D.HWND, D.UINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getalttabinfow */
  static GetAltTabInfoW = [D.BOOL, [D.HWND, D.INT, `_Inout_ ${S.LPALTTABINFO}`, `_Out_ ${D.LPWSTR}`, D.INT]]

  /**
   * Copies the caret's position to the specified POINT structure.
   * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  static GetCaretPos = [D.BOOL, [`_Out_ ${S.LPPOINT}`]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getclassinfoexw */
  static GetClassInfoExW = [D.BOOL, [D.HINSTANCE, [D.WString], `_Out_ ${S.LPWNDCLASSEXW}`]] as const

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getclassnamew */
  static GetClassNameW = [D.INT, [D.HWND, D.LPTSTR, D.INT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcursorpos */
  static GetCursorPos = [D.BOOL, [`_Out_ ${S.LPPOINT}`]]

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getclasslongptrw */
  static GetClassLongPtrW = [D.ULONG_PTR, [D.HWND, D.INT]]

  static GetForegroundWindow = [D.HWND, []]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getmessagew */
  static GetMessageW = [D.BOOL, [`_Out_ ${S.LPMSG}`, D.HWND, D.UINT, D.UINT]]

  static GetParent = [D.HWND, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdata */
  static GetRawInputData = [D.UINT, [S.LPRAWINPUT, D.UINT, D.LPVOID, `_Inout_ ${D.PUINT}`, D.UINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdeviceinfow */
  static GetRawInputDeviceInfoW = [D.UINT, [D.HANDLE, D.UINT, `_Inout_ ${D.LPVOID}`, D.PUINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdevicelist */
  static GetRawInputDeviceList = [D.INT, [`_Out_ ${S.LPRAWINPUTDEVICELIST}`, D.PUINT, D.UINT]]

  static GetTopWindow = [D.HWND, [D.HWND]]

  static GetWindow = [D.HWND, [D.HWND, D.UINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowinfo */
  static GetWindowInfo = [D.BOOL, [D.HWND, `_Inout_ ${S.LPWINDOWINFO}`]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowlongw */
  static GetWindowLongW = [D.LONG, [D.HWND, D.INT]]

  /** only under x64 */
  static GetWindowLongPtrW = [D.LONG_PTR, [D.HWND, D.INT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowrect */
  static GetWindowRect = [D.BOOL, [D.HWND, `_Out_ ${S.LPRECT}`]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowtextw */
  static GetWindowTextW = [D.INT, [D.HWND, D.LPTSTR, D.INT]]

  static GetWindowThreadProcessId = [D.DWORD, [D.HWND, D.LPDWORD]]

}

