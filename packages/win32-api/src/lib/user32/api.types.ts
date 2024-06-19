import * as D from 'win32-def'
import * as S from 'win32-def/struct'


// export interface Win32Fns extends M.DllFuncsModel {
export interface Win32Fns {
  BringWindowToTop: (hWnd: D.HWND) => D.BOOL

  /**
   * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-broadcastsystemmessage
   */
  BroadcastSystemMessage: (
    flags: D.DWORD,
    lpInfo: D.LPDWORD,
    Msg: D.UINT,
    wParam: D.WPARAM,
    lParam: D.LPARAM) => D.LRESULT

  ClientToScreen: (hWnd: D.HWND, lpPoint: D.LPPOINT) => D.BOOL

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-closewindow */
  CloseWindow: (hWnd: D.HWND) => D.BOOL

  CreateWindowExW: (
    dwExStyle: D.DWORD,
    lpClassName: D.LPCTSTR | null,
    lpWindowName: D.LPCTSTR | null,
    dwStyle: D.DWORD,
    x: D.INT,
    y: D.INT,
    nWidth: D.INT,
    nHeight: D.INT,
    hWndParent: D.HWND,
    HMENU: D.HMENU,
    HINSTANCE: D.HINSTANCE,
    LPVOID: D.LPVOID,
  ) => D.HWND

  DefWindowProcW: (hWnd: D.HWND, Msg: D.UINT, wParam: D.WPARAM, lParam: D.LPARAM) => D.LRESULT

  /** https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-destroywindow */
  DestroyWindow: (hWnd: D.HWND) => D.BOOL

  DispatchMessageW: (lpMsg: D.LPMSG) => D.LRESULT

  /** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-enumdisplaydevicesw */
  EnumDisplayDevicesW: (
    lpDevice: D.LPCWSTR,
    iDevNum: D.DWORD,
    lpDisplayDevice: D.PDISPLAY_DEVICEW,
    dwFlags: D.DWORD,
  ) => D.BOOL

  EnumThreadWindows: (dwThreadId: D.DWORD, lpfn: D.WNDENUMPROC, lParam: D.LPARAM) => D.BOOL

  // EnumWindows: EnumWindows
  EnumWindows: (lpEnumFunc: D.WNDENUMPROC, lParam: D.LPARAM) => D.BOOL

  FindWindowExW: (
    hwndParent: D.HWND,
    hwndChildAfter: D.HWND,
    lpszClass: D.LPCTSTR | null,
    lpszWindow: D.LPCTSTR | null,
  ) => D.HWND

  FlashWindow: (hWnd: D.HWND, bInvert: D.BOOL) => D.BOOL

  FlashWindowEx: (pfwi: D.PFLASHWINFO) => D.BOOL

  GetAncestor: (hwnd: D.HWND, gaFlags: D.UINT) => D.HWND

  /** https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getalttabinfow */
  GetAltTabInfoW: (
    hWnd: D.HWND,
    iItem: D.INT,
    pati: D.PALTTABINFO,
    pszItemText: D.LPWSTR | null,
    cchItemText: D.INT,
  ) => D.BOOL

  /**
   * Copies the caret's position to the specified POINT structure.
   * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcaretpos
   */
  GetCaretPos: (lpPoint: D.LPPOINT) => D.BOOL

  GetClassInfoExW: (hinst: D.HINSTANCE, lpszClass: D.LPCTSTR, LPWNDCLASSEX: D.LPWNDCLASSEX) => D.BOOL

  GetForegroundWindow: () => D.HWND

  GetMessageW: (lpMsg: D.LPMSG, HWND: D.HWND, wMsgFilterMin: D.UINT, wMsgFilterMax: D.UINT) => D.BOOL

  GetParent: (hWnd: D.HWND) => D.HWND

  /** https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdeviceinfow */
  GetRawInputDeviceInfoW: (
    hDevice: D.HANDLE,
    uiCommand: D.UINT,
    pData: D.LPVOID,
    pcbSize: D.PUINT,
  ) => D.UINT

  /** https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getrawinputdevicelist */
  GetRawInputDeviceList: (
    /** An array of RAWINPUTDEVICELIST */
    pRawInputDeviceList: D.PRAWINPUTDEVICELIST,
    /**
     * If this value is less than the number of devices attached to the system,
     * the function returns the actual number of devices in this variable
     * and fails with ERROR_INSUFFICIENT_BUFFER.
     */
    puiNumDevices: D.PUINT,
    cbSize: D.UINT,
  ) => D.INT

  GetTopWindow: (hWnd: D.HWND) => D.HWND

  GetWindow: (hWnd: D.HWND, uCmd: D.UINT) => D.HWND

  GetWindowInfo: (hwnd: D.HWND, pwi: D.PWINDOWINFO) => D.BOOL // Note that you must set the pwi.cbSize!

  GetWindowLongW: (hWnd: D.HWND, nIndex: D.INT) => D.LONG

  /** only under x64 */
  GetWindowLongPtrW: (hWnd: D.HWND, nIndex: D.INT) => D.LONG_PTR

  /**
   * @see https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowrect
   */
  GetWindowRect: (hWnd: D.HWND, LPRECT: S.RECT_Type) => D.BOOL

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getwindowtextw
   */
  GetWindowTextW: (hWnd: D.HWND, lpString: D.LPCTSTR, nMaxCount: D.INT) => D.INT

  GetWindowThreadProcessId: (hWnd: D.HWND, lpdwProcessId: D.LPDWORD | null) => D.DWORD

  /**
   * @docs https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-monitorfromwindow
   */
  MonitorFromWindow: (hWnd: D.HWND, dwFlags: D.DWORD) => D.HMONITOR

  IsIconic: (hWnd: D.HWND) => D.BOOL

  IsWindowVisible: (hWnd: D.HWND) => D.BOOL

  PeekMessageW: (
    lpMsg: D.LPMSG,
    HWND: D.HWND,
    wMsgFilterMin: D.UINT,
    wMsgFilterMax: D.UINT,
    wRemoveMsg: D.UINT,
  ) => D.BOOL

  /**
   * ref: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-postmessagew
   */
  PostMessageW: (hWnd: D.HWND, Msg: D.UINT, wPARAM: D.WPARAM, lPARAM: D.LPARAM) => D.BOOL

  /** https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-printwindow */
  PrintWindow: (
    hwnd: D.HWND,
    hdcBlt: D.HDC,
    nFlags: D.UINT,
  ) => D.BOOL

  RegisterClassExW: (lpwcx: S.WNDCLASSEXW_Type) => D.ATOM

  /**
   * https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-registerwindowmessagew
   */
  RegisterWindowMessageW: (lpString: D.LPCTSTR) => D.UINT

  /**
   * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput
   */
  // SendInput: (cInputs: M.UINT, pInputs: M.LPINPUT, cbSize: M.INT) => M.UINT

  /**
   * ref: https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-sendmessagew
   */
  SendMessageW: (hWnd: D.HWND, Msg: D.UINT, wPARAM: D.WPARAM, lPARAM: D.LPARAM) => D.LRESULT

  /**
   * @url https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-SendMessageTimeoutW
   */
  SendMessageTimeoutW: (
    hWnd: D.HWND,
    Msg: D.UINT,
    wParam: D.WPARAM,
    lParam: D.LPARAM,
    fuFlags: D.UINT,
    uTimeout: D.UINT,
    lpdwResult: D.DWORD_PTR) => D.LRESULT

  /** https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-setforegroundwindow */
  SetForegroundWindow: (hWnd: D.HWND) => D.BOOL

  SetWindowPos: (
    hWnd: D.HWND,
    hWndInsertAfter: D.HWND | null,
    X: D.INT,
    Y: D.INT,
    cx: D.INT,
    cy: D.INT,
    uFlags: D.UINT) => D.BOOL

  SetWindowTextW: (hWnd: D.HWND, lpString: D.LPCTSTR | null) => D.BOOL

  SetWinEventHook: (
    eventMin: D.UINT,
    eventMax: D.UINT,
    hmodWinEventProc: D.HMODULE,
    lpfnWinEventProc: D.WINEVENTPROC,
    idProcess: D.DWORD,
    idThread: D.DWORD,
    dwflags: D.UINT,
  ) => D.HWINEVENTHOOK

  ShowWindow: (hWnd: D.HWND, nCmdShow: D.INT) => D.BOOL

  TranslateMessage: (lpMsg: D.LPMSG) => D.BOOL

  TranslateMessageEx: (lpMsg: D.LPMSG) => D.BOOL

  UnhookWinEvent: (hWinEventHook: D.HWINEVENTHOOK) => D.BOOL

  UpdateWindow: (hWnd: D.HWND) => D.BOOL
}

