import * as D from '##/index.def.js'
import * as S from '##/index.struct.js'
import type * as T from '##/index.types.js'


// #region Win32

export type LibWin32 = T.FLib<Win32Fns>

export interface Win32Fns {
  GetCursorPos: (lpPoint: S.POINT_Type) => T.BOOL
  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND

  EnumDisplayDevicesW: (
    lpDevice: T.LPCWSTR | null,
    iDevNum: T.DWORD,
    lpDisplayDevice: S.DISPLAY_DEVICEW_Type,
    dwFlags: T.DWORD,
  ) => T.BOOL

  // test fake struct
  ClientToScreen: (hWnd: T.HWND, lpPoint: T.LPPOINT) => T.BOOL
}

// skip ClientToScreen
export const defWin32 = {
  GetCursorPos: [D.BOOL, [`_Out_ ${S.LPPOINT}`]],
  FindWindowExW: [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]],
  EnumDisplayDevicesW: [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]],
  ClientToScreen: [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]],
} as const

export const defWin32Fake = {
  ClientToScreen: [D.BOOL, [D.HWND, `_Inout_ FAKE_${S.LPPOINT}`]],
} as const

// #region WinspoolFns

export type LibSpool = T.FLib<WinspoolFns>

export interface WinspoolFns {
  /**
   * Enumerates available printers, print servers, domains, or print providers.
   * @link https://learn.microsoft.com/en-us/windows/win32/printdocs/enumprinters
   */
  EnumPrintersW: <Level extends S.EnumPrinters_Level>(
    Flags: T.DWORD,
    Name: T.WString,
    Level: Level,
    // test multiple choice only. It should be T.LPBYTE(Buffer) and ffi.decode to S.EnumPrinters_Level_X_Type<Level>[]
    pPrinterEnum: S.EnumPrinters_Level_X_Type<Level>,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => T.BOOL

  EnumPrintersW_Async: <Level extends S.EnumPrinters_Level>(
    Flags: T.DWORD,
    Name: T.WString,
    Level: Level,
    // test multiple choice only. It should be T.LPBYTE(Buffer) and ffi.decode to S.EnumPrinters_Level_X_Type<Level>[]
    pPrinterEnum: S.EnumPrinters_Level_X_Type<Level>,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => Promise<T.BOOL>
}

export const defWinspool = {
  EnumPrintersW: [D.BOOL,
    [
      D.DWORD,
      D.WString,
      D.DWORD,
      // test multiple choice only. It should be D.LPBYTE
      [
        `_Out_ ${S.PPRINTER_INFO_1}`,
        `_Out_ ${S.PPRINTER_INFO_4}`,
        `_Out_ ${S.PPRINTER_INFO_5}`,
      ],
      D.DWORD,
      D.LPDWORD,
      D.LPDWORD,
    ]],
} as const



// #region kernel32


export interface Kernel32Fns {
  GetTickCount: () => T.DWORD
}

export const defKernel32 = {
  GetTickCount: [D.DWORD, []],
} as const

