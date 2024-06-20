import { FuncDefList } from 'win32-def'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { Win32Fns } from './api.types.js'


export const apiDef: FuncDefList<Win32Fns> = {
  BringWindowToTop: [D.BOOL, [D.HWND]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-broadcastsystemmessage */
  BroadcastSystemMessage: [D.LRESULT, [D.DWORD, `_Inout_ ${D.LPDWORD}`, D.UINT, D.WPARAM, D.LPARAM]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-clienttoscreen */
  ClientToScreen: [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]],

  CloseWindow: [D.BOOL, [D.HWND]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-createwindowexw */
  CreateWindowExW: [
    D.HWND, [
      D.DWORD,
      `_Inout_ ${D.LPCTSTR}`,
      `_Inout_ ${D.LPCTSTR}`,
      D.DWORD,
      D.INT,
      D.INT,
      D.INT,
      D.INT,
      `_Inout_ ${D.HWND}`,
      `_Inout_ ${D.HMENU}`,
      `_Inout_ ${D.HINSTANCE}`,
      `_Inout_ ${D.LPVOID}`,
    ],
  ],

  DefWindowProcW: [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-destroywindow */
  DestroyWindow: [D.BOOL, [D.HWND]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-dispatchmessagew */
  DispatchMessageW: [D.LRESULT, [S.LPMSG]],

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  EnumDisplayDevicesW: [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumthreadwindows */
  EnumThreadWindows: [D.BOOL, [D.DWORD, D.WNDENUMPROC, D.LPARAM]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows */
  EnumWindows: [D.BOOL, [D.WNDENUMPROC, D.LPARAM]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw */
  FindWindowExW: [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]],

  FlashWindow: [D.BOOL, [D.HWND, D.BOOL]],

  FlashWindowEx: [D.BOOL, [S.PFLASHWINFO]],

  GetAncestor: [D.HWND, [D.HWND, D.UINT]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getalttabinfow */
  GetAltTabInfoW: [D.BOOL, [D.HWND, D.INT, `_Inout_ ${S.LPALTTABINFO}`, `_Out_ ${D.LPWSTR}`, D.INT]],

  /**
   * Copies the caret's position to the specified POINT structure.
   * @link https://leran.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  GetCaretPos: [D.BOOL, [`_Out_ ${S.LPPOINT}`]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getclassinfoexw */
  GetClassInfoExW: [D.BOOL, [D.HINSTANCE, D.LPCTSTR, `_Out_ ${S.LPWNDCLASSEXW}`]],

  GetForegroundWindow: [D.HWND, []],

  GetMessageW: [D.BOOL, [D.LPMSG, D.HWND, D.UINT, D.UINT]],

  GetParent: [D.HWND, [D.HWND]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdeviceinfow */
  GetRawInputDeviceInfoW: [D.UINT, [D.HANDLE, D.UINT, `_Inout_ ${D.LPVOID}`, `_Inout_ ${D.PUINT}`]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdevicelist */
  GetRawInputDeviceList: [D.INT, [`_Out_ ${S.LPRAWINPUTDEVICELIST}`, `_Inout_ ${D.PUINT}`, D.UINT]],

  GetTopWindow: [D.HWND, [D.HWND]],

  GetWindow: [D.HWND, [D.HWND, D.UINT]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowinfo */
  GetWindowInfo: [D.BOOL, [D.HWND, `_Inout_ ${S.LPWINDOWINFO}`]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowlongw */
  GetWindowLongW: [D.LONG, [D.HWND, D.INT]],

  /** only under x64 */
  GetWindowLongPtrW: [D.LONG_PTR, [D.HWND, D.INT]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowrect */
  GetWindowRect: [D.BOOL, [D.HWND, `_Out_ ${S.LPRECT}`]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowtextw */
  GetWindowTextW: [D.INT, [D.HWND, `_Out_ ${D.LPTSTR}`, D.INT]],

  GetWindowThreadProcessId: [D.DWORD, [D.HWND, D.LPDWORD]],

  MonitorFromWindow: [D.HWND, [D.HANDLE, D.DWORD]],

  IsIconic: [D.BOOL, [D.HWND]],

  IsWindowVisible: [D.BOOL, [D.HWND]],

  PeekMessageW: [D.BOOL, [D.LPMSG, D.HWND, D.UINT, D.UINT, D.UINT]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-postmessagew */
  PostMessageW: [D.BOOL, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-printwindow */
  PrintWindow: [D.BOOL, [D.HWND, D.HDC, D.UINT]],

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-registerclassexw */
  RegisterClassExW: [D.ATOM, [S.LPWNDCLASSEXW]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew */
  RegisterWindowMessageW: [D.UINT, [D.LPCWSTR]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagew */
  SendMessageW: [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagetimeoutw */
  SendMessageTimeoutW: [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM, D.UINT, D.UINT, `_Out_ ${D.DWORD_PTR}`]],

  SetForegroundWindow: [D.BOOL, [D.HWND]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos */
  SetWindowPos: [D.BOOL, [D.HWND, D.HWND, D.INT, D.INT, D.INT, D.INT, D.UINT]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowtextw */
  SetWindowTextW: [D.BOOL, [D.HWND, D.LPCWSTR]],

  // @TODO WINEVENTPROC
  SetWinEventHook: [D.HWINEVENTHOOK, [D.UINT, D.UINT, D.HMODULE, D.WINEVENTPROC, D.DWORD, D.DWORD, D.UINT]],

  ShowWindow: [D.BOOL, [D.HWND, D.INT]],

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-translatemessage */
  TranslateMessage: [D.BOOL, [S.LPMSG]],

  /** https://learn.microsoft.com/en-us/windows/win32/winmsg/translatemessageex */
  TranslateMessageEx: [D.BOOL, [S.LPMSG]],

  UnhookWinEvent: [D.BOOL, [D.HWINEVENTHOOK]],

  UpdateWindow: [D.BOOL, [D.HWND]],
}

