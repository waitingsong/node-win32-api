import { DllFuncs } from 'win32-def'
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'


import { Win32Fns } from './api.types.js'


export const apiDef: DllFuncs<Win32Fns> = {
  BringWindowToTop: [D.BOOL, [D.HWND]],

  BroadcastSystemMessage: [D.LRESULT, [D.DWORD, D.LPDWORD, D.UINT, D.WPARAM, D.LPARAM]],

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-clienttoscreen */
  ClientToScreen: [D.BOOL, [D.HWND, S.LPPOINT]],

  CloseWindow: [D.BOOL, [D.HWND]],

  CreateWindowExW: [
    D.HWND, [
      D.DWORD, D.LPCTSTR, D.LPCTSTR, D.DWORD,
      D.INT, D.INT, D.INT, D.INT,
      D.HWND, D.HMENU, D.HINSTANCE, D.LPVOID,
    ],
  ],

  DefWindowProcW: [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]],

  DestroyWindow: [D.BOOL, [D.HWND]],

  DispatchMessageW: [D.LRESULT, [S.LPMSG]],

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  EnumDisplayDevicesW: [D.BOOL, [D.LPCWSTR, D.DWORD, S.LPDISPLAY_DEVICEW, D.DWORD]],

  EnumThreadWindows: [D.BOOL, [D.DWORD, D.WNDENUMPROC, D.LPARAM]],

  EnumWindows: [D.BOOL, [D.WNDENUMPROC, D.LPARAM]],

  FindWindowExW: [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]],

  FlashWindow: [D.BOOL, [D.HWND, D.BOOL]],

  FlashWindowEx: [D.BOOL, [S.PFLASHWINFO]],

  GetAncestor: [D.HWND, [D.HWND, D.UINT]],

  GetAltTabInfoW: [D.BOOL, [D.HWND, D.INT, D.INT, D.LPWSTR, D.INT]],

  /**
   * Copies the caret's position to the specified POINT structure.
   * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  GetCaretPos: [D.BOOL, [S.LPPOINT]],

  GetClassInfoExW: [D.BOOL, [D.HINSTANCE, D.LPCTSTR, S.LPWNDCLASSEXW]],

  GetForegroundWindow: [D.HWND, []],

  GetMessageW: [D.BOOL, [D.LPMSG, D.HWND, D.UINT, D.UINT]],

  GetParent: [D.HWND, [D.HWND]],

  GetRawInputDeviceInfoW: [D.UINT, [D.HANDLE, D.UINT, D.LPVOID, D.PUINT]],

  GetRawInputDeviceList: [D.INT, [S.LPRAWINPUTDEVICELIST, D.PUINT, D.UINT]],

  GetTopWindow: [D.HWND, [D.HWND]],

  GetWindow: [D.HWND, [D.HWND, D.UINT]],

  GetWindowInfo: [D.BOOL, [D.HWND, D.PWINDOWINFO]],

  GetWindowLongW: [D.LONG, [D.HWND, D.INT]],

  /** only under x64 */
  GetWindowLongPtrW: [D.LONG_PTR, [D.HWND, D.INT]],

  GetWindowRect: [D.BOOL, [D.HWND, S.LPRECT]],

  GetWindowTextW: [D.INT, [D.HWND, D.LPTSTR, D.INT]],

  GetWindowThreadProcessId: [D.DWORD, [D.HWND, D.LPDWORD]],

  MonitorFromWindow: [D.HWND, [D.HANDLE, D.DWORD]],

  IsIconic: [D.BOOL, [D.HWND]],

  IsWindowVisible: [D.BOOL, [D.HWND]],

  PeekMessageW: [D.BOOL, [D.LPMSG, D.HWND, D.UINT, D.UINT, D.UINT]],

  PostMessageW: [D.BOOL, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]],

  PrintWindow: [D.BOOL, [D.HWND, D.HDC, D.UINT]],

  RegisterClassExW: [D.ATOM, [S.LPWNDCLASSEXW]],

  RegisterWindowMessageW: [D.UINT, [D.LPCTSTR]],

  SendMessageW: [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]],

  SendMessageTimeoutW: [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM, D.UINT, D.UINT, D.DWORD_PTR]],

  SetForegroundWindow: [D.BOOL, [D.HWND]],

  SetWindowPos: [D.BOOL, [D.HWND, D.HWND, D.INT, D.INT, D.INT, D.INT, D.UINT]],

  SetWindowTextW: [D.BOOL, [D.HWND, D.LPCTSTR]],

  SetWinEventHook: [D.HWINEVENTHOOK, [D.UINT, D.UINT, D.HMODULE, D.WINEVENTPROC, D.DWORD, D.DWORD, D.UINT]],

  ShowWindow: [D.BOOL, [D.HWND, D.INT]],

  TranslateMessage: [D.BOOL, [D.LPMSG]],

  TranslateMessageEx: [D.BOOL, [D.LPMSG]],

  UnhookWinEvent: [D.BOOL, [D.HWINEVENTHOOK]],

  UpdateWindow: [D.BOOL, [D.HWND]],
}


// export interface EnumWindows {
//   (lpEnumFunc: M.WNDENUMPROC, lParam: M.LPARAM): M.BOOL
//   async: (lpEnumFunc: M.WNDENUMPROC, lParam: M.LPARAM, cb: (err: Error) => void) => void
// }
