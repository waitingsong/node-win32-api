import * as W from '../windef';
import * as GT from '../types';
// import * as LT from './types';

export const fnDef: GT.Win32FnDef = {
    CreateWindowExW: [W.HWND, [
        W.DWORD, W.LPCTSTR, W.LPCTSTR, W.DWORD,
        W.INT, W.INT, W.INT, W.INT,
        W.HWND, W.HMENU, W.HINSTANCE, W.LPVOID,
    ]],

    DefWindowProcW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],

    DispatchMessageW: [W.LRESULT, [W.LPMSG]],

    EnumWindows: [W.BOOL, [W.WNDENUMPROC, W.LPARAM]],

    FindWindowExW: [W.HWND, [W.HWND, W.HWND, W.LPCTSTR, W.LPCTSTR]],

    GetAncestor: [W.HWND, [W.HWND, W.UINT]],

    GetClassInfoExW: [W.BOOL, [W.HINSTANCE, W.LPCTSTR, W.LPWNDCLASSEX]],

    GetMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT]],

    GetParent: [W.HWND, [W.HWND]],

    GetWindowInfo: [W.BOOL, [W.HWND, W.PWINDOWINFO]],

    GetWindowTextW: [W.INT, [W.HWND, W.LPTSTR, W.INT]],

    GetWindowThreadProcessId: [W.DWORD, [W.HWND, W.LPDWORD]],

    IsWindowVisible: [W.BOOL, [W.HWND]],

    RegisterClassExW: [W.ATOM, [W.WNDCLASSEX]],

    SetWindowTextW: [W.BOOL, [W.HWND, W.LPCTSTR]],

    SetWinEventHook: [W.HWINEVENTHOOK, [W.UINT, W.UINT, W.HMODULE, W.WINEVENTPROC, W.DWORD, W.DWORD, W.UINT]],

    ShowWindow: [W.BOOL, [W.HWND, W.INT]],

    TranslateMessage: [W.BOOL, [W.LPMSG]],

    TranslateMessageEx: [W.BOOL, [W.LPMSG]],

    UnhookWinEvent: [W.BOOL, [W.HWINEVENTHOOK]],

    UpdateWindow: [W.BOOL, [W.HWND]],
};

export interface Win32Fn {
    CreateWindowExW(
        dwExStyle: GT.DWORD,
        lpClassName: GT.LPCTSTR | null,
        lpWindowName: GT.LPCTSTR | null,
        dwStyle: GT.DWORD,
        x: GT.INT,
        y: GT.INT,
        nWidth: GT.INT,
        nHeight: GT.INT,
        hWndParent: GT.HWND | null,
        HMENU: GT.HMENU | null,
        HINSTANCE: GT.HINSTANCE | null,
        LPVOID: GT.LPVOID | null
    ): GT.HWND;

    DefWindowProcW(hWnd: GT.HWND, Msg: GT.UINT, wParam: GT.WPARAM, lParam: GT.LPARAM): GT.LRESULT;

    DispatchMessageW(lpMsg: GT.LPMSG): GT.LRESULT;

    EnumWindows: EnumWindows;

    FindWindowExW(hwndParent: GT.HWND | null, hwndChildAfter: GT.HWND | null, lpszClass: GT.LPCTSTR | null, lpszWindow: GT.LPCTSTR | null): GT.HWND;

    GetAncestor(hwnd: GT.HWND, gaFlags: GT.UINT): GT.HWND;

    GetClassInfoExW(hinst: GT.HINSTANCE | null, lpszClass: GT.LPCTSTR, LPWNDCLASSEX: GT.LPWNDCLASSEX): GT.BOOL;

    GetMessageW(lpMsg: GT.LPMSG, HWND: GT.HWND | null, wMsgFilterMin: GT.UINT, wMsgFilterMax: GT.UINT): GT.BOOL;

    GetParent(hWnd: GT.HWND): GT.HWND;

    GetWindowInfo(hwnd: GT.HWND, pwi: GT.PWINDOWINFO): GT.BOOL;   // Note that you must set the cbSize

    GetWindowTextW(hWnd: GT.HWND, lpString: GT.LPCTSTR, nMaxCount: GT.INT): GT.INT;

    GetWindowThreadProcessId(hWnd: GT.HWND, lpdwProcessId: GT.LPDWORD | null): GT.DWORD;

    IsWindowVisible(hWnd: GT.HWND): GT.BOOL;

    RegisterClassExW(lpwcx: GT.WNDCLASSEX): GT.ATOM;

    SetWindowTextW(hWnd: GT.HWND, lpString: GT.LPCTSTR | null): GT.BOOL;

    SetWinEventHook(
        eventMin: GT.UINT,
        eventMax: GT.UINT,
        hmodWinEventProc: GT.HMODULE,
        lpfnWinEventProc: GT.WINEVENTPROC,
        idProcess: GT.DWORD,
        idThread: GT.DWORD,
        dwflags: GT.UINT
    ): GT.HWINEVENTHOOK;

    ShowWindow(hWnd: GT.HWND, nCmdShow: GT.INT): GT.BOOL;

    TranslateMessage(lpMsg: GT.LPMSG): GT.BOOL;

    TranslateMessageEx(lpMsg: GT.LPMSG): GT.BOOL;

    UnhookWinEvent(hWinEventHook: GT.HWINEVENTHOOK): GT.BOOL;

    UpdateWindow(hWnd: GT.HWND): GT.BOOL;
}


export interface EnumWindows {
    (lpEnumFunc: GT.WNDENUMPROC, lParam: GT.LPARAM): GT.BOOL;
    async(lpEnumFunc: GT.WNDENUMPROC, lParam: GT.LPARAM, cb: (err: Error) => void): GT.BOOL;
}

// https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
export enum CmdShow {
    // Hides the window and activates another window.
    SW_HIDE = 0,

    // Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.
    SW_SHOWNORMAL = 1,

    // Activates the window and displays it as a minimized window.
    SW_SHOWMINIMIZED = 2,

    // Activates the window and displays it as a maximized window.
    SW_SHOWMAXIMIZED = 3,

    // Maximizes the specified window.
    SW_MAXIMIZE = 3,

    // Displays a window in its most recent size and position. This value is similar to SW_SHOWNORMAL, except that the window is not activated.
    SW_SHOWNOACTIVATE = 4,

    // Activates the window and displays it in its current size and position.
    SW_SHOW = 5,

    // Minimizes the specified window and activates the next top-level window in the Z order.
    SW_MINIMIZE = 6,

    // Displays the window as a minimized window. This value is similar to SW_SHOWMINIMIZED, except the window is not activated.
    SW_SHOWMINNOACTIVE = 7,

    // Displays the window in its current size and position. This value is similar to SW_SHOW, except that the window is not activated.
    SW_SHOWNA = 8,

    // Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position.
    SW_RESTORE = 9,

    // Sets the show state based on the SW_ value specified in the STARTUPINFO structure passed to the CreateProcess function by the program that started the application.
    SW_SHOWDEFAULT = 10,

    // Minimizes a window, even if the thread that owns the window is not responding. This flag should only be used when minimizing windows from a different thread.
    SW_FORCEMINIMIZE = 11,
}
