# win32-api

Definitions of Windows Date Types for [node-ffi], [node-ffi-napi]

[![GitHub tag](https://img.shields.io/github/tag/waitingsong/node-win32-api.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg)
[![ci](https://github.com/waitingsong/node-win32-api/workflows/ci-win/badge.svg)](https://github.com/waitingsong/node-win32-api/actions?query=workflow%3A%22ci-win%22)
[![Build status](https://ci.appveyor.com/api/projects/status/nrivtykm5uf84fbl/branch/main?svg=true)](https://ci.appveyor.com/project/waitingsong/node-win32-api/branch/main)
[![codecov](https://codecov.io/gh/waitingsong/node-win32-api/branch/main/graph/badge.svg?token=WXbZvnAaYO)](https://codecov.io/gh/waitingsong/node-win32-api)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Initialization

```sh
npm run repo:init
```

## Packages

| Package       | Version                |
| ------------- | ---------------------- |
| [`win32-api`] | [![main-svg]][main-ch] |
| [`win32-def`] | [![def-svg]][def-ch]   |


## What can I do with this?

Write [node-ffi] or [node-ffi-napi] calling win32 native functions code by Typescript with Types support.


## Installing
```sh
npm install win32-def
```


## Usage

### FFI
```ts
import * as ffi from 'ffi-napi'
import { DModel as M, DTypes as W, FModel as FM } from 'win32-def'

export interface Win32Fns extends FM.DllFuncsModel {
  ClientToScreen(hWnd: M.HWND, lpPoint: M.LPPOINT): M.BOOL
  GetAncestor(hwnd: M.HWND, gaFlags: M.UINT): M.HWND
}

export const user32: Win32Fns = ffi.Library('user32.dll', {
  ClientToScreen: [W.BOOL, [W.HWND, W.LPPOINT] ],
  GetAncestor: [W.HWND, [W.HWND, W.UINT] ],
})
```

```ts
import * as ffi from 'ffi-napi'
import { DModel as M, DTypes as W, FModel as FM } from 'win32-def'

export interface Win32Fns extends FM.DllFuncsModel {
  ClientToScreen(hWnd: M.HWND, lpPoint: M.LPPOINT): M.BOOL
  GetAncestor(hwnd: M.HWND, gaFlags: M.UINT): M.HWND
}

export const user32: FM.ExpandFnModel<Win32Fns> = ffi.Library('user32.dll', {
  ClientToScreen: [W.BOOL, [W.HWND, W.LPPOINT] ],
  GetAncestor: [W.HWND, [W.HWND, W.UINT] ],
})

// You can calling with BOTH sync and async method
const hWnd = user32.GetAncestor(hWnd, uint)
user32.GetAncestor.async(handle, uint, (err, hWnd) => {
  // typeof hWnd will be the same of ReturnType of sync method
  if (err) {
    throw err
  }
  if (hWnd && !ref.isNull(hWnd) && ref.address(hWnd)) {
    // ...
  }
  else {
    throw new Error('hWnd invalid')
  }
})
```


## Relevant
- [Windows Api documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/ff468919%28v=vs.85%29.aspx)
- [Windows Data Types](https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751#DWORD)
- [System Error Codes](https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381%28v=vs.85%29.aspx)
- [FFI doc](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)
- [ref doc](https://tootallnate.github.io/ref/)
- [ref-struct](https://github.com/TooTallNate/ref-struct)


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

