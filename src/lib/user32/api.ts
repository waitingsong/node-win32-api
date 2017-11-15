import * as GT from '../types';
import * as W from '../windef';
// import * as LT from './types';


export interface Win32Fns {
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

    EnumThreadWindows(dwThreadId: GT.DWORD, lpfn: GT.WNDENUMPROC, lParam: GT.LPARAM): GT.BOOL;

    EnumWindows: EnumWindows;

    FindWindowExW(hwndParent: GT.HWND | null, hwndChildAfter: GT.HWND | null, lpszClass: GT.LPCTSTR | null, lpszWindow: GT.LPCTSTR | null): GT.HWND;

    GetAncestor(hwnd: GT.HWND, gaFlags: GT.UINT): GT.HWND;

    GetClassInfoExW(hinst: GT.HINSTANCE | null, lpszClass: GT.LPCTSTR, LPWNDCLASSEX: GT.LPWNDCLASSEX): GT.BOOL;

    GetMessageW(lpMsg: GT.LPMSG, HWND: GT.HWND | null, wMsgFilterMin: GT.UINT, wMsgFilterMax: GT.UINT): GT.BOOL;

    GetParent(hWnd: GT.HWND): GT.HWND;

    GetWindow(hWnd: GT.HWND, uCmd: GT.UINT): GT.HWND;

    GetWindowInfo(hwnd: GT.HWND, pwi: GT.PWINDOWINFO): GT.BOOL;   // Note that you must set the pwi.cbSize!

    GetWindowLongW(hWnd: GT.HWND, nIndex: GT.INT): GT.LONG;

    GetWindowLongPtrW(hWnd: GT.HWND, nIndex: GT.INT): GT.LONG_PTR;

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


export const apiDef: GT.ApiDef = {
    CreateWindowExW: [W.HWND, [
        W.DWORD, W.LPCTSTR, W.LPCTSTR, W.DWORD,
        W.INT, W.INT, W.INT, W.INT,
        W.HWND, W.HMENU, W.HINSTANCE, W.LPVOID,
    ]],

    DefWindowProcW: [W.LRESULT, [W.HWND, W.UINT, W.WPARAM, W.LPARAM]],

    DispatchMessageW: [W.LRESULT, [W.LPMSG]],

    EnumThreadWindows: [W.BOOL, [W.DWORD, W.WNDENUMPROC, W.LPARAM]],

    EnumWindows: [W.BOOL, [W.WNDENUMPROC, W.LPARAM]],

    FindWindowExW: [W.HWND, [W.HWND, W.HWND, W.LPCTSTR, W.LPCTSTR]],

    GetAncestor: [W.HWND, [W.HWND, W.UINT]],

    GetClassInfoExW: [W.BOOL, [W.HINSTANCE, W.LPCTSTR, W.LPWNDCLASSEX]],

    GetMessageW: [W.BOOL, [W.LPMSG, W.HWND, W.UINT, W.UINT]],

    GetParent: [W.HWND, [W.HWND]],

    GetWindow: [W.HWND, [W.HWND, W.UINT]],

    GetWindowInfo: [W.BOOL, [W.HWND, W.PWINDOWINFO]],

    GetWindowLongW: [W.LONG, [W.HWND, W.INT]],

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
/* istanbul ignore next */
if (process.arch === 'x64') {
    apiDef.GetWindowLongPtrW = [W.LONG_PTR, [W.HWND, W.INT]];
}

export interface EnumWindows {
    (lpEnumFunc: GT.WNDENUMPROC, lParam: GT.LPARAM): GT.BOOL;
    async(lpEnumFunc: GT.WNDENUMPROC, lParam: GT.LPARAM, cb: (err: Error) => void): GT.BOOL;
}
