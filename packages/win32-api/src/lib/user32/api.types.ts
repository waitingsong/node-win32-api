import * as T from 'win32-def'
import * as S from 'win32-def/struct'


// export interface Win32Fns extends M.DllFuncsModel {
export interface Win32Fns {
  BringWindowToTop: (hWnd: T.HWND) => T.BOOL

  /**
   * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-broadcastsystemmessage
   */
  BroadcastSystemMessage: (
    flags: T.DWORD,
    lpInfo: T.LPDWORD,
    Msg: T.UINT,
    wParam: T.WPARAM,
    lParam: T.LPARAM) => T.LRESULT

  ClientToScreen: (hWnd: T.HWND, lpPoint: T.LPPOINT) => T.BOOL

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-closewindow */
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

  DefWindowProcW: (hWnd: T.HWND, Msg: T.UINT, wParam: T.WPARAM, lParam: T.LPARAM) => T.LRESULT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-destroywindow */
  DestroyWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-dispatchmessagew */
  DispatchMessageW: (lpMsg: T.LPMSG) => T.LRESULT

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  EnumDisplayDevicesW: (
    lpDevice: T.LPCWSTR,
    iDevNum: T.DWORD,
    lpDisplayDevice: S.DISPLAY_DEVICEW_Type,
    dwFlags: T.DWORD,
  ) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumthreadwindows */
  EnumThreadWindows: (dwThreadId: T.DWORD, lpfn: T.WNDENUMPROC, lParam: T.LPARAM) => T.BOOL

  // EnumWindows: EnumWindows
  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-enumwindows */
  EnumWindows: (lpEnumFunc: T.WNDENUMPROC, lParam: T.LPARAM) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-findwindowexw */
  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND

  FlashWindow: (hWnd: T.HWND, bInvert: T.BOOL) => T.BOOL

  FlashWindowEx: (pfwi: S.FLASHWINFO_Type) => T.BOOL

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
   * @link https://leran.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  GetCaretPos: (lpPoint: T.LPPOINT) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getclassinfoexw */
  GetClassInfoExW: (hinst: T.HINSTANCE, lpszClass: T.LPCTSTR, LPWNDCLASSEX: S.WNDCLASSEXW_Type) => T.BOOL

  GetForegroundWindow: () => T.HWND

  GetMessageW: (lpMsg: T.LPMSG, HWND: T.HWND, wMsgFilterMin: T.UINT, wMsgFilterMax: T.UINT) => T.BOOL

  GetParent: (hWnd: T.HWND) => T.HWND

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

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-monitorfromwindow
   */
  MonitorFromWindow: (hWnd: T.HWND, dwFlags: T.DWORD) => T.HMONITOR

  IsIconic: (hWnd: T.HWND) => T.BOOL

  IsWindowVisible: (hWnd: T.HWND) => T.BOOL

  PeekMessageW: (
    lpMsg: T.LPMSG,
    HWND: T.HWND,
    wMsgFilterMin: T.UINT,
    wMsgFilterMax: T.UINT,
    wRemoveMsg: T.UINT,
  ) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-postmessagew */
  PostMessageW: (hWnd: T.HWND | null, Msg: T.UINT, wPARAM: T.WPARAM, lPARAM: T.LPARAM) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-printwindow */
  PrintWindow: (
    hwnd: T.HWND,
    hdcBlt: T.HDC,
    nFlags: T.UINT,
  ) => T.BOOL

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-registerclassexw */
  RegisterClassExW: (lpwcx: S.WNDCLASSEXW_Type) => T.ATOM

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew */
  RegisterWindowMessageW: (lpString: T.LPCWSTR) => T.UINT

  /**
   * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput
   */
  // SendInput: (cInputs: M.UINT, pInputs: M.LPINPUT, cbSize: M.INT) => M.UINT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagew */
  SendMessageW: (hWnd: T.HWND, Msg: T.UINT, wPARAM: T.WPARAM, lPARAM: T.LPARAM) => T.LRESULT

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagetimeoutw */
  SendMessageTimeoutW: (
    hWnd: T.HWND,
    Msg: T.UINT,
    wParam: T.WPARAM,
    lParam: T.LPARAM,
    fuFlags: T.UINT,
    uTimeout: T.UINT,
    lpdwResult: T.DWORD_PTR | null) => T.LRESULT

  /** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-setforegroundwindow */
  SetForegroundWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos */
  SetWindowPos: (
    hWnd: T.HWND,
    hWndInsertAfter: T.HWND | null,
    X: T.INT,
    Y: T.INT,
    cx: T.INT,
    cy: T.INT,
    uFlags: T.UINT) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowtextw */
  SetWindowTextW: (hWnd: T.HWND, lpString: T.LPCWSTR | null) => T.BOOL

  SetWinEventHook: (
    eventMin: T.UINT,
    eventMax: T.UINT,
    hmodWinEventProc: T.HMODULE,
    lpfnWinEventProc: T.WINEVENTPROC,
    idProcess: T.DWORD,
    idThread: T.DWORD,
    dwflags: T.UINT,
  ) => T.HWINEVENTHOOK

  ShowWindow: (hWnd: T.HWND, nCmdShow: T.INT) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-translatemessage */
  TranslateMessage: (lpMsg: S.MSG_Type) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/winmsg/translatemessageex */
  TranslateMessageEx: (lpMsg: S.MSG_Type) => T.BOOL

  UnhookWinEvent: (hWinEventHook: T.HWINEVENTHOOK) => T.BOOL

  UpdateWindow: (hWnd: T.HWND) => T.BOOL
}

