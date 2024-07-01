/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import { User32_F } from './EF.types.js'


export class User32_G extends User32_F {

  GetAncestor: (hwnd: T.HWND, gaFlags: T.UINT) => T.HWND

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getalttabinfow */
  GetAltTabInfoW: (
    hWnd: T.HWND,
    iItem: T.INT,
    pati: S.ALTTABINFO_Type,
    pszItemText: T.LPWSTR | null,
    cchItemText: T.INT,
  ) => T.BOOL

  /**
   * Copies the caret's position to the specified POINT structure.
   * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  GetCaretPos: (lpPoint: S.POINT_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getclassinfoexw */
  GetClassInfoExW: (hinst: T.HINSTANCE, lpszClass: T.LPCTSTR, LPWNDCLASSEX: S.WNDCLASSEXW_Type) => T.BOOL


  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getclassnamew */
  GetClassNameW: (hWnd: T.HWND, lpClassName: T.LPTSTR, nMaxCount: T.INT) => T.INT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcursorpos */
  GetCursorPos: (lpPoint: S.POINT_Type) => T.BOOL

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-getclasslongptrw */
  GetClassLongPtrW: (hWnd: T.HWND, nIndex: T.INT) => T.ULONG_PTR

  GetForegroundWindow: () => T.HWND

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getmessagew */
  GetMessageW: (lpMsg: S.MSG_Type, HWND: T.HWND, wMsgFilterMin: T.UINT, wMsgFilterMax: T.UINT) => T.BOOL

  GetParent: (hWnd: T.HWND) => T.HWND

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdata */
  GetRawInputData: (
    hRawInput: S.RAWINPUT_Type,
    uiCommand: T.UINT,
    pData: T.LPVOID | null,
    pcbSize: T.PUINT,
    cbSizeHeader: T.UINT,
  ) => T.UINT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdeviceinfow */
  GetRawInputDeviceInfoW: (
    hDevice: T.HANDLE,
    uiCommand: T.UINT,
    pData: T.LPVOID | null,
    pcbSize: T.PUINT,
  ) => T.UINT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdevicelist */
  GetRawInputDeviceList: (
    /** An array of RAWINPUTDEVICELIST */
    pRawInputDeviceList: S.RAWINPUTDEVICELIST_Type | null,
    /**
     * If this value is less than the number of devices attached to the system,
     * the function returns the actual number of devices in this variable
     * and fails with ERROR_INSUFFICIENT_BUFFER.
     */
    puiNumDevices: T.PUINT,
    cbSize: T.UINT,
  ) => T.INT

  GetTopWindow: (hWnd: T.HWND) => T.HWND

  GetWindow: (hWnd: T.HWND, uCmd: T.UINT) => T.HWND

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowinfo */
  GetWindowInfo: (hwnd: T.HWND, pwi: S.WINDOWINFO_Type) => T.BOOL // Note that you must set the pwi.cbSize!

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowlongw */
  GetWindowLongW: (hWnd: T.HWND, nIndex: T.INT) => T.LONG

  /** only under x64 */
  GetWindowLongPtrW: (hWnd: T.HWND, nIndex: T.INT) => T.LONG_PTR

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowrect */
  GetWindowRect: (hWnd: T.HWND, LPRECT: S.RECT_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowtextw */
  GetWindowTextW: (hWnd: T.HWND, lpString: T.LPCTSTR, nMaxCount: T.INT) => T.INT

  GetWindowThreadProcessId: (hWnd: T.HWND, lpdwProcessId: T.LPDWORD | null) => T.DWORD

}

/* c8 ignore stop */
