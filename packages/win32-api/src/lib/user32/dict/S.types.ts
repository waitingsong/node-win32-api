/* c8 ignore start */
import type * as S from 'win32-def/struct'
import type * as T from 'win32-def/types'

import { User32_R } from './PR.types.js'


export class User32_S extends User32_R {

  /**
   * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput
   */
  SendInput: (cInputs: T.UINT, pInputs: S.INPUT_Type[], cbSize: T.INT) => T.UINT

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

  /** https://learn.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-setforegroundwindow */
  SetForegroundWindow: (hWnd: T.HWND) => T.BOOL

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setparent */
  SetParent: (hWndChild: T.HWND, hWndNewParent: T.HWND) => T.HWND

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

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindowasync */
  ShowWindowAsync: (hWnd: T.HWND, nCmdShow: T.INT) => T.BOOL

}

/* c8 ignore stop */
