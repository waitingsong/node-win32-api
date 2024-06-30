# win32-api

Definitions of Windows Date Types for [koffi]

[![GitHub tag](https://img.shields.io/github/tag/waitingsong/node-win32-api.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg)
[![ci](https://github.com/waitingsong/node-win32-api/actions/workflows/nodejs-win.yml/badge.svg
)](https://github.com/waitingsong/node-win32-api/actions)
[![codecov](https://codecov.io/gh/waitingsong/node-win32-api/branch/main/graph/badge.svg?token=WXbZvnAaYO)](https://codecov.io/gh/waitingsong/node-win32-api)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Significant [Changes.V22]

Compile successfully with
- Node.js v18
- Node.js v20
- Node.js v22

## Packages

| Package       | Version                |
| ------------- | ---------------------- |
| [`win32-api`] | [![main-svg]][main-ch] |
| [`win32-def`] | [![def-svg]][def-ch]   |


## What can I do with this?

Write [koffi] calling win32 native functions code by Typescript with Types support.


## Installing
```sh
npm install win32-def
```


## Usage

### FFI Def
```ts
import * as D from 'win32-def/def'
import * as S from 'win32-def/struct'
import * as T from 'win32-def/types'

export class DefWin32 extends Def_B implements T.LibDefBase {
  [x: string]: T.FnDefFullParams
  static ClientToScreen = [D.BOOL, [D.HWND, `_Inout_ ${S.LPPOINT}`]]
  static EnumDisplayDevicesW = [D.BOOL, [D.LPCWSTR, D.DWORD, `_Inout_ ${S.LPDISPLAY_DEVICEW}`, D.DWORD]]
  static FindWindowExW = [D.HWND, [D.HWND, D.HWND, D.LPCTSTR, D.LPCTSTR]]
  static GetCursorPos = [D.BOOL, [`_Out_ ${S.LPPOINT}`]]
}

export class Win32 implements T.LibDef2Type<typeof DefWin32> {
  ClientToScreen: (hWnd: T.HWND, lpPoint: S.POINT_Type) => T.BOOL

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
```

### Calling

```ts
import { load } from 'win32-def'
import { POINT_Factory } from 'win32-def/struct'

const lib = load<Win32>(options)
const { payload: pos } = POINT_Factory()

const res = await lib.GetCursorPos_Async(pos)
assert(res > 0)
console.info({ res, pos })
assert(pos.x >= 0 && pos.y >= 0) 
```


## Relevant
- [Windows Api documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/ff468919%28v=vs.85%29.aspx)
- [Windows Data Types](https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751#DWORD)
- [System Error Codes](https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381%28v=vs.85%29.aspx)
- [FFI doc](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)


## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)


[node-gyp]: https://github.com/nodejs/node-gyp
[windows-build-tools]: https://github.com/felixrieseberg/windows-build-tools
[node-ffi-napi]: https://github.com/node-ffi-napi/node-ffi-napi
[node-ffi]: https://github.com/node-ffi/node-ffi

[`win32-api`]: https://github.com/waitingsong/node-win32-api/tree/main/packages/win32-api
[main-svg]: https://img.shields.io/npm/v/win32-api.svg?maxAge=86400
[main-ch]: https://github.com/waitingsong/node-win32-api/tree/main/packages/win32-api/CHANGELOG.md
[main-d-svg]: https://david-dm.org/waitingsong/node-win32-api.svg?path=packages/win32-api
[main-d-link]: https://david-dm.org/waitingsong/node-win32-api.svg?path=packages/win32-api
[main-dd-svg]: https://david-dm.org/waitingsong/node-win32-api/dev-status.svg?path=packages/win32-api
[main-dd-link]: https://david-dm.org/waitingsong/node-win32-api?path=packages/win32-api#info=devDependencies

[`win32-def`]: https://github.com/waitingsong/node-win32-api/tree/main/packages/win32-def
[def-svg]: https://img.shields.io/npm/v/win32-def.svg?maxAge=86400
[def-ch]: https://github.com/waitingsong/node-win32-api/tree/main/packages/win32-def/CHANGELOG.md
[def-d-svg]: https://david-dm.org/waitingsong/node-win32-api.svg?path=packages/win32-def
[def-d-link]: https://david-dm.org/waitingsong/node-win32-api.svg?path=packages/win32-def
[def-dd-svg]: https://david-dm.org/waitingsong/node-win32-api/dev-status.svg?path=packages/win32-def
[def-dd-link]: https://david-dm.org/waitingsong/node-win32-api?path=packages/win32-def#info=devDependencies


[Changes.V22]: https://github.com/waitingsong/node-win32-api/CHANGES.v22.md
[koffi]: https://github.com/node-ffi-napi/node-ffi-napi/issues/269
