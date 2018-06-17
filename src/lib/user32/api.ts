import { DModel as DM, DTypes as DT, FModel } from 'win32-def'


export interface Win32Fns {
  CreateWindowExW(
        dwExStyle: DM.DWORD,
        lpClassName: DM.LPCTSTR | null,
        lpWindowName: DM.LPCTSTR | null,
        dwStyle: DM.DWORD,
        x: DM.INT,
        y: DM.INT,
        nWidth: DM.INT,
        nHeight: DM.INT,
        hWndParent: DM.HWND | null,
        HMENU: DM.HMENU | null,
        HINSTANCE: DM.HINSTANCE | null,
        LPVOID: DM.LPVOID | null,
    ): DM.HWND

  DefWindowProcW(hWnd: DM.HWND, Msg: DM.UINT, wParam: DM.WPARAM, lParam: DM.LPARAM): DM.LRESULT

  DispatchMessageW(lpMsg: DM.LPMSG): DM.LRESULT

  EnumThreadWindows(dwThreadId: DM.DWORD, lpfn: DM.WNDENUMPROC, lParam: DM.LPARAM): DM.BOOL

  // tslint:disable-next-line
  EnumWindows: EnumWindows

  FindWindowExW(
        hwndParent: DM.HWND | null,
        hwndChildAfter: DM.HWND | null,
        lpszClass: DM.LPCTSTR | null,
        lpszWindow: DM.LPCTSTR | null,
    ): DM.HWND

  GetAncestor(hwnd: DM.HWND, gaFlags: DM.UINT): DM.HWND

  GetClassInfoExW(hinst: DM.HINSTANCE | null, lpszClass: DM.LPCTSTR, LPWNDCLASSEX: DM.LPWNDCLASSEX): DM.BOOL

  GetMessageW(lpMsg: DM.LPMSG, HWND: DM.HWND | null, wMsgFilterMin: DM.UINT, wMsgFilterMax: DM.UINT): DM.BOOL

  GetParent(hWnd: DM.HWND): DM.HWND

  GetWindow(hWnd: DM.HWND, uCmd: DM.UINT): DM.HWND

  GetWindowInfo(hwnd: DM.HWND, pwi: DM.PWINDOWINFO): DM.BOOL   // Note that you must set the pwi.cbSize!

  GetWindowLongW(hWnd: DM.HWND, nIndex: DM.INT): DM.LONG

  GetWindowLongPtrW(hWnd: DM.HWND, nIndex: DM.INT): DM.LONG_PTR

  GetWindowTextW(hWnd: DM.HWND, lpString: DM.LPCTSTR, nMaxCount: DM.INT): DM.INT

  GetWindowThreadProcessId(hWnd: DM.HWND, lpdwProcessId: DM.LPDWORD | null): DM.DWORD

  IsWindowVisible(hWnd: DM.HWND): DM.BOOL

  RegisterClassExW(lpwcx: DM.WNDCLASSEX): DM.ATOM

  SetWindowTextW(hWnd: DM.HWND, lpString: DM.LPCTSTR | null): DM.BOOL

  SetWinEventHook(
        eventMin: DM.UINT,
        eventMax: DM.UINT,
        hmodWinEventProc: DM.HMODULE,
        lpfnWinEventProc: DM.WINEVENTPROC,
        idProcess: DM.DWORD,
        idThread: DM.DWORD,
        dwflags: DM.UINT,
    ): DM.HWINEVENTHOOK

  ShowWindow(hWnd: DM.HWND, nCmdShow: DM.INT): DM.BOOL

  TranslateMessage(lpMsg: DM.LPMSG): DM.BOOL

  TranslateMessageEx(lpMsg: DM.LPMSG): DM.BOOL

  UnhookWinEvent(hWinEventHook: DM.HWINEVENTHOOK): DM.BOOL

  UpdateWindow(hWnd: DM.HWND): DM.BOOL
}


export const apiDef: FModel.DllFuncs = {
  CreateWindowExW: [DT.HWND, [
    DT.DWORD, DT.LPCTSTR, DT.LPCTSTR, DT.DWORD,
    DT.INT, DT.INT, DT.INT, DT.INT,
    DT.HWND, DT.HMENU, DT.HINSTANCE, DT.LPVOID,
  ] ],

  DefWindowProcW: [DT.LRESULT, [DT.HWND, DT.UINT, DT.WPARAM, DT.LPARAM] ],

  DispatchMessageW: [DT.LRESULT, [DT.LPMSG] ],

  EnumThreadWindows: [DT.BOOL, [DT.DWORD, DT.WNDENUMPROC, DT.LPARAM] ],

  EnumWindows: [DT.BOOL, [DT.WNDENUMPROC, DT.LPARAM] ],

  FindWindowExW: [DT.HWND, [DT.HWND, DT.HWND, DT.LPCTSTR, DT.LPCTSTR] ],

  GetAncestor: [DT.HWND, [DT.HWND, DT.UINT] ],

  GetClassInfoExW: [DT.BOOL, [DT.HINSTANCE, DT.LPCTSTR, DT.LPWNDCLASSEX] ],

  GetMessageW: [DT.BOOL, [DT.LPMSG, DT.HWND, DT.UINT, DT.UINT] ],

  GetParent: [DT.HWND, [DT.HWND] ],

  GetWindow: [DT.HWND, [DT.HWND, DT.UINT] ],

  GetWindowInfo: [DT.BOOL, [DT.HWND, DT.PWINDOWINFO] ],

  GetWindowLongW: [DT.LONG, [DT.HWND, DT.INT] ],

  GetWindowTextW: [DT.INT, [DT.HWND, DT.LPTSTR, DT.INT] ],

  GetWindowThreadProcessId: [DT.DWORD, [DT.HWND, DT.LPDWORD] ],

  IsWindowVisible: [DT.BOOL, [DT.HWND] ],

  RegisterClassExW: [DT.ATOM, [DT.WNDCLASSEX] ],

  SetWindowTextW: [DT.BOOL, [DT.HWND, DT.LPCTSTR] ],

  SetWinEventHook: [DT.HWINEVENTHOOK, [DT.UINT, DT.UINT, DT.HMODULE, DT.WINEVENTPROC, DT.DWORD, DT.DWORD, DT.UINT] ],

  ShowWindow: [DT.BOOL, [DT.HWND, DT.INT] ],

  TranslateMessage: [DT.BOOL, [DT.LPMSG] ],

  TranslateMessageEx: [DT.BOOL, [DT.LPMSG] ],

  UnhookWinEvent: [DT.BOOL, [DT.HWINEVENTHOOK] ],

  UpdateWindow: [DT.BOOL, [DT.HWND] ],
}
/* istanbul ignore next */
if (process.arch === 'x64') {
  apiDef.GetWindowLongPtrW = [DT.LONG_PTR, [DT.HWND, DT.INT] ]
}

export interface EnumWindows {
  (lpEnumFunc: DM.WNDENUMPROC, lParam: DM.LPARAM): DM.BOOL
  async(lpEnumFunc: DM.WNDENUMPROC, lParam: DM.LPARAM, cb: (err: Error) => void): DM.BOOL
}
