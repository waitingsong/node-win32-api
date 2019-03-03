import { DModel as M, DTypes as W, FModel as FM } from 'win32-def'


export interface Win32Fns extends FM.DllFuncsModel {
  ClientToScreen(hWnd: M.HWND, lpPoint: M.LPPOINT): M.BOOL

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-closewindow */
  CloseWindow(hWnd: M.HWND): M.BOOL

  CreateWindowExW(
    dwExStyle: M.DWORD,
    lpClassName: M.LPCTSTR | null,
    lpWindowName: M.LPCTSTR | null,
    dwStyle: M.DWORD,
    x: M.INT,
    y: M.INT,
    nWidth: M.INT,
    nHeight: M.INT,
    hWndParent: M.HWND | null,
    HMENU: M.HMENU | null,
    HINSTANCE: M.HINSTANCE | null,
    LPVOID: M.LPVOID | null,
  ): M.HWND

  DefWindowProcW(hWnd: M.HWND, Msg: M.UINT, wParam: M.WPARAM, lParam: M.LPARAM): M.LRESULT

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-destroywindow */
  DestroyWindow(hWnd: M.HWND): M.BOOL

  DispatchMessageW(lpMsg: M.LPMSG): M.LRESULT

  EnumThreadWindows(dwThreadId: M.DWORD, lpfn: M.WNDENUMPROC, lParam: M.LPARAM): M.BOOL

  // tslint:disable-next-line
  EnumWindows: EnumWindows

  FindWindowExW(
    hwndParent: M.HWND | null,
    hwndChildAfter: M.HWND | null,
    lpszClass: M.LPCTSTR | null,
    lpszWindow: M.LPCTSTR | null,
  ): M.HWND

  GetAncestor(hwnd: M.HWND, gaFlags: M.UINT): M.HWND

  GetClassInfoExW(hinst: M.HINSTANCE | null, lpszClass: M.LPCTSTR, LPWNDCLASSEX: M.LPWNDCLASSEX): M.BOOL

  GetMessageW(lpMsg: M.LPMSG, HWND: M.HWND | null, wMsgFilterMin: M.UINT, wMsgFilterMax: M.UINT): M.BOOL

  GetParent(hWnd: M.HWND): M.HWND

  GetWindow(hWnd: M.HWND, uCmd: M.UINT): M.HWND

  GetWindowInfo(hwnd: M.HWND, pwi: M.PWINDOWINFO): M.BOOL   // Note that you must set the pwi.cbSize!

  GetWindowLongW(hWnd: M.HWND, nIndex: M.INT): M.LONG

  GetWindowLongPtrW(hWnd: M.HWND, nIndex: M.INT): M.LONG_PTR

  GetWindowTextW(hWnd: M.HWND, lpString: M.LPCTSTR, nMaxCount: M.INT): M.INT

  GetWindowThreadProcessId(hWnd: M.HWND, lpdwProcessId: M.LPDWORD | null): M.DWORD

  IsWindowVisible(hWnd: M.HWND): M.BOOL

  // tslint:disable:max-line-length
  PeekMessageW(lpMsg: M.LPMSG, HWND: M.HWND | null, wMsgFilterMin: M.UINT, wMsgFilterMax: M.UINT, wRemoveMsg: M.UINT): M.BOOL

  /**
   * ref: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-postmessagew
   */
  PostMessageW(hWnd: M.HWND, Msg: M.UINT, wPARAM: M.WPARAM, lPARAM: M.LPARAM): M.BOOL

  RegisterClassExW(lpwcx: M.WNDCLASSEX): M.ATOM

  /**
   * ref: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-sendmessagew
   */
  SendMessageW(hWnd: M.HWND, Msg: M.UINT, wPARAM: M.WPARAM, lPARAM: M.LPARAM): M.LRESULT

  SetWindowTextW(hWnd: M.HWND, lpString: M.LPCTSTR | null): M.BOOL

  SetWinEventHook(
    eventMin: M.UINT,
    eventMax: M.UINT,
    hmodWinEventProc: M.HMODULE,
    lpfnWinEventProc: M.WINEVENTPROC,
    idProcess: M.DWORD,
    idThread: M.DWORD,
    dwflags: M.UINT,
  ): M.HWINEVENTHOOK

  ShowWindow(hWnd: M.HWND, nCmdShow: M.INT): M.BOOL

  TranslateMessage(lpMsg: M.LPMSG): M.BOOL

  TranslateMessageEx(lpMsg: M.LPMSG): M.BOOL

  UnhookWinEvent(hWinEventHook: M.HWINEVENTHOOK): M.BOOL

  UpdateWindow(hWnd: M.HWND): M.BOOL
}


export const apiDef: FM.DllFuncs = {
  /** url: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-clienttoscreen */
  ClientToScreen: [W.BOOL, [W.HWND, W.LPPOINT] ],

  CloseWindow: [W.BOOL, [W.HWND] ],

  CreateWindowExW: [W.HWND, [
    W.DWORD, W.LPCTSTR, W.LPCTSTR, W.DWORD,
    W.INT, W.INT, W.INT, W.INT,
    W.HWND, W.HMENU, W.HINSTANCE, W.LPVOID,
  ] ],

  DefWindowProcW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM] ],

  DestroyWindow: [W.BOOL, [W.HWND] ],

  DispatchMessageW: [W.LRESULT, [W.LPMSG] ],

  EnumThreadWindows: [W.BOOL, [W.DWORD, W.WNDENUMPROC, W.LPARAM] ],

  EnumWindows: [W.BOOL, [W.WNDENUMPROC, W.LPARAM] ],

  FindWindowExW: [W.HWND, [W.HWND, W.HWND, W.LPCTSTR, W.LPCTSTR] ],

  GetAncestor: [W.HWND, [W.HWND, W.UINT] ],

  GetClassInfoExW: [W.BOOL, [W.HINSTANCE, W.LPCTSTR, W.LPWNDCLASSEX] ],

  GetMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT] ],

  GetParent: [W.HWND, [W.HWND] ],

  GetWindow: [W.HWND, [W.HWND, W.UINT] ],

  GetWindowInfo: [W.BOOL, [W.HWND, W.PWINDOWINFO] ],

  GetWindowLongW: [W.LONG, [W.HWND, W.INT] ],

  GetWindowTextW: [W.INT, [W.HWND, W.LPTSTR, W.INT] ],

  GetWindowThreadProcessId: [W.DWORD, [W.HWND, W.LPDWORD] ],

  IsWindowVisible: [W.BOOL, [W.HWND] ],

  PeekMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT, W.UINT] ],

  PostMessageW: [W.BOOL, [W.HWND, W.UINT, W.WPARAM, W.LPARAM] ],

  RegisterClassExW: [W.ATOM, [W.WNDCLASSEX] ],

  SendMessageW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM] ],

  SetWindowTextW: [W.BOOL, [W.HWND, W.LPCTSTR] ],

  SetWinEventHook: [W.HWINEVENTHOOK, [W.UINT, W.UINT, W.HMODULE, W.WINEVENTPROC, W.DWORD, W.DWORD, W.UINT] ],

  ShowWindow: [W.BOOL, [W.HWND, W.INT] ],

  TranslateMessage: [W.BOOL, [W.LPMSG] ],

  TranslateMessageEx: [W.BOOL, [W.LPMSG] ],

  UnhookWinEvent: [W.BOOL, [W.HWINEVENTHOOK] ],

  UpdateWindow: [W.BOOL, [W.HWND] ],
}
/* istanbul ignore next */
if (process.arch === 'x64') {
  apiDef.GetWindowLongPtrW = [W.LONG_PTR, [W.HWND, W.INT] ]
}

export interface EnumWindows {
  (lpEnumFunc: M.WNDENUMPROC, lParam: M.LPARAM): M.BOOL
  async(lpEnumFunc: M.WNDENUMPROC, lParam: M.LPARAM, cb: (err: Error) => void): M.BOOL
}
