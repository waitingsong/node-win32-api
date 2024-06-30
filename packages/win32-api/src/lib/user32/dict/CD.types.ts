/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import { User32_B } from './AB.types.js'


export class User32_C extends User32_B {

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-callwindowprocw */
  CallWindowProcW: (lpPrevWndFunc: T.WNDPROC, hWnd: T.HWND, Msg: T.UINT, wParam: T.WPARAM, lParam: T.LPARAM) => T.LRESULT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-changedisplaysettingsexw */
  ChangeDisplaySettingsExW: (
    lpszDeviceName: T.WString,
    lpDevMode: S.DEVMODEW_Type,
    hWnd: T.HWND,
    dwFlags: T.DWORD,
    lpVoid: T.LPVOID,
  ) => T.LONG

  ClientToScreen: (hWnd: T.HWND, lpPoint: S.POINT_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-closewindow */
  CloseWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowexw */
  CreateWindowExW: (
    dwExStyle: T.DWORD,
    lpClassName: T.LPCTSTR | null,
    lpWindowName: T.LPCTSTR | null,
    dwStyle: T.DWORD,
    x: T.INT,
    y: T.INT,
    nWidth: T.INT,
    nHeight: T.INT,
    hWndParent: T.HWND,
    HMENU: T.HMENU,
    HINSTANCE: T.HINSTANCE,
    LPVOID: T.LPVOID,
  ) => T.HWND

}

export class User32_D extends User32_C {

  DefWindowProcW: (hWnd: T.HWND, Msg: T.UINT, wParam: T.WPARAM, lParam: T.LPARAM) => T.LRESULT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-destroywindow */
  DestroyWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-dispatchmessagew */
  DispatchMessageW: (lpMsg: S.MSG_Type) => T.LRESULT

}

/* c8 ignore stop */
