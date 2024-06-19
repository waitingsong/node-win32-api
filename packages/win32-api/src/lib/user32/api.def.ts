import { DllFuncs } from 'win32-def'
import * as W from 'win32-def/common.def'
import * as S from 'win32-def/struct'


import { Win32Fns } from './api.types.js'


export const apiDef: DllFuncs<Win32Fns> = {
  BringWindowToTop: [W.BOOL, [W.HWND]],

  BroadcastSystemMessage: [W.LRESULT, [W.DWORD, W.LPDWORD, W.UINT, W.WPARAM, W.LPARAM]],

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-clienttoscreen */
  ClientToScreen: [W.BOOL, [W.HWND, S.LPPOINT]],

  CloseWindow: [W.BOOL, [W.HWND]],

  CreateWindowExW: [
    W.HWND, [
      W.DWORD, W.LPCTSTR, W.LPCTSTR, W.DWORD,
      W.INT, W.INT, W.INT, W.INT,
      W.HWND, W.HMENU, W.HINSTANCE, W.LPVOID,
    ],
  ],

  DefWindowProcW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],

  DestroyWindow: [W.BOOL, [W.HWND]],

  DispatchMessageW: [W.LRESULT, [S.LPMSG]],

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  EnumDisplayDevicesW: [W.BOOL, [W.LPCWSTR, W.DWORD, S.LPDISPLAY_DEVICEW, W.DWORD]],

  EnumThreadWindows: [W.BOOL, [W.DWORD, W.WNDENUMPROC, W.LPARAM]],

  EnumWindows: [W.BOOL, [W.WNDENUMPROC, W.LPARAM]],

  FindWindowExW: [W.HWND, [W.HWND, W.HWND, W.LPCTSTR, W.LPCTSTR]],

  FlashWindow: [W.BOOL, [W.HWND, W.BOOL]],

  FlashWindowEx: [W.BOOL, [S.PFLASHWINFO]],

  GetAncestor: [W.HWND, [W.HWND, W.UINT]],

  GetAltTabInfoW: [W.BOOL, [W.HWND, W.INT, W.INT, W.LPWSTR, W.INT]],

  /**
   * Copies the caret's position to the specified POINT structure.
   * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  GetCaretPos: [W.BOOL, [W.LPPOINT]],

  GetClassInfoExW: [W.BOOL, [W.HINSTANCE, W.LPCTSTR, W.LPWNDCLASSEX]],

  GetForegroundWindow: [W.HWND, []],

  GetMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT]],

  GetParent: [W.HWND, [W.HWND]],

  GetRawInputDeviceInfoW: [W.UINT, [W.HANDLE, W.UINT, W.LPVOID, W.PUINT]],

  GetRawInputDeviceList: [W.INT, [S.LPRAWINPUTDEVICELIST, W.PUINT, W.UINT]],

  GetTopWindow: [W.HWND, [W.HWND]],

  GetWindow: [W.HWND, [W.HWND, W.UINT]],

  GetWindowInfo: [W.BOOL, [W.HWND, W.PWINDOWINFO]],

  GetWindowLongW: [W.LONG, [W.HWND, W.INT]],

  /** only under x64 */
  GetWindowLongPtrW: [W.LONG_PTR, [W.HWND, W.INT]],

  GetWindowRect: [W.BOOL, [W.HWND, S.LPRECT]],

  GetWindowTextW: [W.INT, [W.HWND, W.LPTSTR, W.INT]],

  GetWindowThreadProcessId: [W.DWORD, [W.HWND, W.LPDWORD]],

  MonitorFromWindow: [W.HWND, [W.HANDLE, W.DWORD]],

  IsIconic: [W.BOOL, [W.HWND]],

  IsWindowVisible: [W.BOOL, [W.HWND]],

  PeekMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT, W.UINT]],

  PostMessageW: [W.BOOL, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],

  PrintWindow: [W.BOOL, [W.HWND, W.HDC, W.UINT]],

  RegisterClassExW: [W.ATOM, [S.LPWNDCLASSEXW]],

  RegisterWindowMessageW: [W.UINT, [W.LPCTSTR]],

  SendMessageW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],

  SendMessageTimeoutW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM, W.UINT, W.UINT, W.DWORD_PTR]],

  SetForegroundWindow: [W.BOOL, [W.HWND]],

  SetWindowPos: [W.BOOL, [W.HWND, W.HWND, W.INT, W.INT, W.INT, W.INT, W.UINT]],

  SetWindowTextW: [W.BOOL, [W.HWND, W.LPCTSTR]],

  SetWinEventHook: [W.HWINEVENTHOOK, [W.UINT, W.UINT, W.HMODULE, W.WINEVENTPROC, W.DWORD, W.DWORD, W.UINT]],

  ShowWindow: [W.BOOL, [W.HWND, W.INT]],

  TranslateMessage: [W.BOOL, [W.LPMSG]],

  TranslateMessageEx: [W.BOOL, [W.LPMSG]],

  UnhookWinEvent: [W.BOOL, [W.HWINEVENTHOOK]],

  UpdateWindow: [W.BOOL, [W.HWND]],
}


// export interface EnumWindows {
//   (lpEnumFunc: M.WNDENUMPROC, lParam: M.LPARAM): M.BOOL
//   async: (lpEnumFunc: M.WNDENUMPROC, lParam: M.LPARAM, cb: (err: Error) => void) => void
// }
