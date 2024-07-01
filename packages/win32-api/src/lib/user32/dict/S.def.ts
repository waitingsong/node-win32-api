import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'

import { DefUser32_R } from './PR.def.js'


export class DefUser32_S extends DefUser32_R {

  /**
   * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendinput
   */
  static SendInput = [D.UINT, [D.UINT, S.LPINPUT, D.INT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagew */
  static SendMessageW = [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-sendmessagetimeoutw */
  static SendMessageTimeoutW = [D.LRESULT, [D.HWND, D.UINT, D.WPARAM, D.LPARAM, D.UINT, D.UINT, D.DWORD_PTR]]

  static SetForegroundWindow = [D.BOOL, [D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setparent */
  static SetParent = [D.HWND, [D.HWND, D.HWND]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos */
  static SetWindowPos = [D.BOOL, [D.HWND, D.HWND, D.INT, D.INT, D.INT, D.INT, D.UINT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowtextw */
  static SetWindowTextW = [D.BOOL, [D.HWND, D.WString]]

  // @TODO WINEVENTPROC
  static SetWinEventHook = [D.HWINEVENTHOOK, [D.UINT, D.UINT, D.HMODULE, D.WINEVENTPROC, D.DWORD, D.DWORD, D.UINT]]

  static ShowWindow = [D.BOOL, [D.HWND, D.INT]]

  /** https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindowasync */
  static ShowWindowAsync = [D.BOOL, [D.HWND, D.INT]]

}

