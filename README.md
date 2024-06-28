# win32-api

FFI Definitions of Windows win32 api for [koffi]

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

## Migrate to v13

See [migrate13]


## Packages

| Package       | Version                |
| ------------- | ---------------------- |
| [`win32-api`] | [![main-svg]][main-ch] |
| [`win32-def`] | [![def-svg]][def-ch]   |


## What can I do with this?
Calling win32 native functions come from user32.dll, kernel32.dll, comctl32.dll by Node.js via [node-ffi-napi]


## Installing
```sh
npm install win32-api
```


## Usage

### DLL Wrapper
 
- [User32](./src/util/user32/index.user32.ts)
- [Winspool](./src/util/winspool/index.winspool.ts)

```ts
import { 
  FindWindow, 
  GetDefaultPrinter,
} from 'win32-api/util'

// Retrieves the printer name of the default printer for the current user on the local computer
const printerName = await GetDefaultPrinter()

const child = spawn('notepad.exe')
const hWnd = await FindWindowEx(0, 0, 'Notepad', null)
```


## Demo
- [Demos](https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/demo)
- [Tests](https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/test)



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
[node-gyp-on-windows]: https://github.com/nodejs/node-gyp#on-windows
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


[koffi]: https://github.com/node-ffi-napi/node-ffi-napi/issues/269
[migrate13]: ./migrate13.md
[Changes.V22]: https://github.com/waitingsong/node-win32-api/CHANGES.v22.md

