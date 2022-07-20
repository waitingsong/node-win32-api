# win32-api

Windows win32 api 接口定义

[![GitHub tag](https://img.shields.io/github/tag/waitingsong/node-win32-api.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg)
[![ci](https://github.com/waitingsong/node-win32-api/workflows/ci-win/badge.svg)](https://github.com/waitingsong/node-win32-api/actions?query=workflow%3A%22ci-win%22)
[![Build status](https://ci.appveyor.com/api/projects/status/nrivtykm5uf84fbl/branch/main?svg=true)](https://ci.appveyor.com/project/waitingsong/node-win32-api/branch/main)
[![codecov](https://codecov.io/gh/waitingsong/node-win32-api/branch/main/graph/badge.svg?token=WXbZvnAaYO)](https://codecov.io/gh/waitingsong/node-win32-api)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Migrate to v13

See [migrate13]

## Initialization

```sh
npm run bootstrap
```

## Packages

| Package       | Version                |
| ------------- | ---------------------- |
| [`win32-api`] | [![main-svg]][main-ch] |
| [`win32-def`] | [![def-svg]][def-ch]   |


## 用途
用于 Node.js 通过 [node-ffi-napi] 调用系统user32.dll, kerner32.dll, comctl32.dll 等动态链接库提供的函数


## 安装
```sh
npm install win32-api
```

## 使用

### DLL Wrapper
 
- [User32](./packages/win32-api/src/func/user32/index.user32.ts)
- [Winspool](./packages/win32-api/src/func/winspool/index.winspool.ts)

```ts
import { 
  user32FindWindowEx, 
  winspoolGetDefaultPrinter,
} from 'win32-api/fun'

// 获取当前电脑当前用户默认打印机名
const printerName = await winspoolGetDefaultPrinter()

const child = spawn('notepad.exe')
const hWnd = await user32FindWindowEx(0, 0, 'Notepad', null)

```

### Find window and set window title
```ts
// **查询计算器程序窗口句柄（需要先手动运行一个计算器）**

/**
 * 导出的模块:
 * Comctl32: Comctl32 from lib/comctl32/api
 * Kernel32: kernel32 from lib/kernel32/api
 * User32: user32 from lib/user32/api
 */
import { Kernel32, User32 } from 'win32-api/promise'
import ref from 'ref-napi'

const knl32 = Kernel32.load()
const user32 = User32.load()

// const user32 = load(['FindWindowExW'])  // load only one api defined in lib/{dll}/api from user32.dll

// const title = 'Calculator\0'    // null-terminated string
 const title = '计算器\0'    // null-terminated string 字符串必须以\0即null结尾!

const lpszWindow = Buffer.from(title, 'ucs2')
const hWnd = await user32.FindWindowExW(0, 0, null, lpszWindow)

assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)
console.log('buf: ', hWnd)

// Change title of the Calculator
const res = await user32.SetWindowTextW(hWnd, Buffer.from('Node-Calculator\0', 'ucs2'))
if ( ! res) {
  console.log('SetWindowTextW failed')
}
else {
  console.log('window title changed')
}
```

### [Ref](https://www.npmjs.com/package/ref-napi)
```ts
import ref from 'ref-napi'

// so we can all agree that a buffer with the int value written
// to it could be represented as an "int *"
const buf  = Buffer.alloc(4)
buf.writeInt32LE(12345, 0)

const hex = ref.hexAddress(buf)
console.log(typeof hex)
console.log(hex)  // ← '7FA89D006FD8'

buf.type = ref.types.int  // @ts-ignore

// now we can dereference to get the "meaningful" value
console.log(ref.deref(buf))  // ← 12345
```

```ts
// use of types and windef:
import ref from 'ref-napi'
import { DModel as M } from 'win32-api'
import { Kernel32, User32 } from 'win32-api/promise'

const knl32 = Kernel32.load()
const user32 = User32.load()

const lpszClass = Buffer.from('guard64\0', 'ucs2')
const hInstanceBuffer = ref.alloc(W.HANDLE_PVOID)
const hInstanceAddr = ref.address(hInstanceBuffer)

await knl32.GetModuleHandleExW(0, lpszClass, hInstanceAddr)
// <Buffer@0x00000094D3968EC0 00 00 a4 60 ff 7f 00 00, type: { indirection: 2, name: 'uint64*' }>
console.log(hInstanceBuffer)
console.log(hInstanceBuffer.readInt32LE(0))     // -> 1621360640           (60A40000)
console.log(hInstanceBuffer.readBigUInt64LE())  // -> 140734814748672n (7FFF60A40000)
```

### [Struct](https://www.npmjs.com/package/ref-struct)
```ts
// struct usage with ref-struct
import { retrieveStructFromPtrAddress, StructFactory } from 'win32-api'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
} from 'win32-api'

// https://msdn.microsoft.com/en-us/library/windows/desktop/dd162805(v=vs.85).aspx
const point = StructFactory<M.POINT>(DS.POINT)
point.x = 100
point.y = 200
console.log(point)
```

### [Struct](https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-def/src/lib/struct/)
```ts
import { StructFactory } from 'win32-api'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
} from 'win32-api'


// https://docs.microsoft.com/zh-cn/windows/win32/api/wingdi/ns-wingdi-display_devicew 
const dd: M.DISPLAY_DEVICEW = StructFactory(DS.DISPLAY_DEVICEW)
dd.cb = dd.ref().byteLength
console.log(dd)
// https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/test/user32/51.user32.EnumDisplayDevicesW.test.ts
```

### Async Find window and set window title
```ts
// **Find calc's hWnd, need running a calculator program manually at first**
import * as ref from 'ref-napi'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
} from 'win32-api'
import { Kernel32, User32 } from 'win32-api/promise'


const knl32 = Kernel32.load()
const user32 = User32.load()

const lpszClass = Buffer.from('CalcFrame\0', 'ucs2')
// win10
const calcLpszWindow = Buffer.from('Calculator\0', 'ucs2')
// for win7/8
const calcLpszClass = Buffer.from('CalcFrame\0', 'ucs2')

const child = spawn('calc.exe')
const hWnd = await user32.FindWindowExW(0, 0, null, calcLpszWindow) // win10
const hWnd = await user32.FindWindowExW(0, 0, calcLpszClass , null) // win7/8
assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0, 'found no calc window')

const title = 'Node-Calculator'
const len = title.length

const ret = await user32.SetWindowTextW(hWnd, Buffer.from(title + '\0', 'ucs2'))
assert(ret, 'SetWindowTextW() failed')

const buf = Buffer.alloc(len * 2)
await user32.GetWindowTextW(hWnd, buf, len + 1)
const str = buf.toString('ucs2').replace(/\0+$/, '')
assert(str === title.trim(), `title should be changed to "${title}", bug got "${str}"`)

child.kill() // seems not work under win10
```


## Demo
- [create_window](https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/demo/create_window.ts)
- [Demos](https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/demo)
- [Tests](https://github.com/waitingsong/node-win32-api/blob/main/packages/win32-api/test)

## 依赖安装问题
Compile successfully with
  - Node.js v18, Python v3.9 and VS2019, VS2022
  - Node.js v16, Python v3.9 and VS2019, VS2022
  - Node.js v14, Python v3.7 and VS2019

If installation of node-gyp fails:
Check out [node-gyp] and [node-gyp-on-windows], [windows-build-tools]

## 相关文档
- [Windows Api documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/ff468919%28v=vs.85%29.aspx)
- [Windows Data Types](https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751#DWORD)
- [System Error Codes](https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381%28v=vs.85%29.aspx)
- [FFI doc](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)
- [ref doc](https://tootallnate.github.io/ref/)
- [ref-struct](https://github.com/TooTallNate/ref-struct)


## 版权
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

