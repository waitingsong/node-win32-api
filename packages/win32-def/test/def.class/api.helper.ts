import * as D from '##/index.def.js'
import * as S from '##/index.struct.js'
import * as T from '##/index.types.js'


// #region Win32

export type LibWin32 = T.FLib<Win32>

class Def_A {
  static ClientToScreen = [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]]
  static EnumDisplayDevicesW = [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]]
}

class Def_B extends Def_A {
  static FindWindowExW = [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]]
  static GetCursorPos = [D.BOOL, [`_Out_ ${S.LPPOINT}`]]
}

export class DefWin32 extends Def_B implements T.LibDefBase {
  [x: string]: T.FnDefFullParams
}


export class DefWin32Fake implements T.LibDefBase {
  [x: string]: T.FnDefFullParams
  static ClientToScreen = [D.BOOL, [D.HWND, `_Inout_ FAKE_${S.LPPOINT}`]]
}

export class Win32 implements T.LibDef2Type<typeof DefWin32> {
  // test fake struct LPPOINT
  ClientToScreen: (hWnd: T.HWND, lpPoint: T.LPPOINT) => T.BOOL

  EnumDisplayDevicesW: (
    lpDevice: T.LPCWSTR | null,
    iDevNum: T.DWORD,
    lpDisplayDevice: S.DISPLAY_DEVICEW_Type,
    dwFlags: T.DWORD,
  ) => T.BOOL

  FindWindowExW: (
    hwndParent: T.HWND,
    hwndChildAfter: T.HWND,
    lpszClass: T.LPCTSTR | null,
    lpszWindow: T.LPCTSTR | null,
  ) => T.HWND

  GetCursorPos: (lpPoint: S.POINT_Type) => T.BOOL
}

// #region Winspool

export type LibWinspool = T.FLib<Winspool>

export class DefWinspool implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  static EnumPrintersW = [D.BOOL,
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
    ]] as const
}

export class Winspool implements T.LibDef2Type<typeof DefWinspool> {
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

// #region Winspool2

export type LibWinspool2 = T.FLib<Winspool>

export class DefWinspool2 implements T.LibDefBase {
  [x: string]: T.FnDefFullParams

  static EnumPrintersW = [D.BOOL,
    [
      D.DWORD,
      D.WString,
      D.DWORD,
      `_Out_ ${D.LPBYTE}`,
      D.DWORD,
      D.LPDWORD,
      D.LPDWORD,
    ]] as const
}

export class Winspool2 implements T.LibDef2Type<typeof DefWinspool2> {
  EnumPrintersW: <Level extends S.EnumPrinters_Level>(
    Flags: T.DWORD,
    Name: T.WString,
    Level: Level,
    pPrinterEnum: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => T.BOOL

  EnumPrintersW_Async: <Level extends S.EnumPrinters_Level>(
    Flags: T.DWORD,
    Name: T.WString,
    Level: Level,
    pPrinterEnum: T.LPBYTE,
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
    pcReturned: T.LPDWORD,
  ) => Promise<T.BOOL>
}

// #region kernel32

export type LibKernel32 = T.FLib<Kernel32>

export class DefKernel32 implements T.LibDefBase {
  [x: string]: T.FnDefFullParams
  static GetTickCount = [D.DWORD, []]
}

export class Kernel32 implements T.LibDef2Type<typeof DefKernel32> {
  GetTickCount: () => T.DWORD
}

