# Notable Changes v22

## Feat

### 1. Use [koffi] as node-ffi to support nodejs >= 18

### 2. Remove dependencies ffi-napi, ref-napi, ref-struct-di, ref-union-di

### 3. Easy structures initialization `<struct name>_Factory()` 

### 4. Very easy structure/union definition

- Simple example [`POINT`]
- Complex example [`DEVMODEW`] contains sub struct and union
- Complex example [`DISPLAY_DEVICEW`] contains FixedInt16Array

### 5. Auto create necessary struct/union when loading library from method def

```ts
import * as D from '##/index.def.js'
import * as S from '##/index.struct.js'
import * as T from '##/index.types.js' 

class DefWin {
  static ClientToScreen = [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]] //  S.LPPOINT == 'POINT*'
  static EnumDisplayDevicesW = [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]] // S.LPDISPLAY_DEVICEW == 'DISPLAY_DEVICEW*'
  static GetCursorPos = [D.BOOL, [`_Out_ ${S.LPPOINT}`]]
}

```

The structures of `LPPOINT`, `LPDISPLAY_DEVICEW` will be created on `load()` automatically

### 6. Multiple Choice Parameters

It can define multiple def choice for one parameter:

```ts
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import * as T from 'win32-def/types'

export class DefWinspool implements T.LibDefBase {

  static GetPrinterW = [D.BOOL, [
    D.HANDLE,
    D.DWORD,
    // multiple choice instead of `_Out_ ${D.LPBYTE}`,
    [
      `_Out_ ${S.PPRINTER_INFO_1}`,
      `_Out_ ${S.PPRINTER_INFO_4}`,
      `_Out_ ${S.PPRINTER_INFO_5}`,
      `_Out_ ${S.PPRINTER_INFO_6}`,
      `_Out_ ${S.PPRINTER_INFO_8}`,
      `_Out_ ${S.PPRINTER_INFO_9}`,
    ],
    D.DWORD,
    `_Out_ ${D.LPDWORD}`,
  ]] as const // `as const` is required for multipleChoice

}

export class Winspool implements T.LibDef2Type<typeof DefWinspool> {

  GetPrinterW: <Level extends S.PRINTER_INFO_LEVEL> (
    hPrinter: T.HANDLE,
    Level: T.DWORD,
    pPrinter: S.PRINTER_INFO_X_Type<Level>, // multiple choice
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
  ) => T.BOOL


  // You should declare async one only for generics
  GetPrinterW_Async: <Level extends S.PRINTER_INFO_LEVEL> (
    hPrinter: T.HANDLE,
    Level: T.DWORD,
    pPrinter: S.PRINTER_INFO_X_Type<Level>, // multiple choice
    cbBuf: T.DWORD,
    pcbNeeded: T.LPDWORD,
  ) => Promise<T.BOOL>
  
}

```

It must define multipleChoice mapper for this method: [`GetPrinterW_mapper`]


## Refactor

### win32-def

- Change export `/common.def` to `/def`
- rename function `bufferToString()` -> `ucsBufferToString()`

### win32-api

- exposed `DTypes` changed to `Def`
- exposed `DStruct` changed to `Struct`
- exposed `DModle` changed to `Types`
- exposed `/func` changed to '/util'
- `winmsg.ts` moved to `win32-def/winmsg.enum.ts` as `WIN_MSG`
- `kernel32/consts.ts` moved to `win32-def/consts/winbase.enum.ts`
- `user32/consts.ts` moved `win32-def/consts/user32.enum.ts`


	

[koffi]: https://github.com/node-ffi-napi/node-ffi-napi/issues/269

[`POINT`]: https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-def/src/lib/struct/windef/POINT.ts
[`DEVMODEW`]: https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-def/src/lib/struct/wingdi/DEVMODEW.ts
[`DISPLAY_DEVICEW`]: https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-def/src/lib/struct/wingdi/DISPLAY_DEVICEW.ts 
[`GetPrinterW_mapper`]: https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/src/lib/winspool/mapper/GetPrinterW.mapper.ts
