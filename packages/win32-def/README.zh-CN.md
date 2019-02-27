# win32-def
Definitions of Windows Date Types for [node-ffi](https://github.com/node-ffi/node-ffi), [node-ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi)

[![Version](https://img.shields.io/npm/v/win32-def.svg)](https://www.npmjs.com/package/win32-def)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/waitingsong/node-win32-def.svg?branch=master)](https://travis-ci.org/waitingsong/node-win32-def)
[![Build status](https://ci.appveyor.com/api/projects/status/8g4ud87q0mnys6tg/branch/master?svg=true)](https://ci.appveyor.com/project/waitingsong/node-win32-def/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/waitingsong/node-win32-def/badge.svg)](https://coveralls.io/github/waitingsong/node-win32-def)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)



## 用途
通过 [node-ffi](https://github.com/node-ffi/node-ffi) 或者 [node-ffi-napi](https://github.com/node-ffi-napi/node-ffi-napi) 调用系统 `win32` 接口方法时提供 ```TypeScript``` 类型支持

## 安装
```powershell
npm install win32-def
```

## 使用

```ts
import * as ffi from 'ffi'
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
// struct usage by ref-struct
import * as Struct from 'ref-struct'
import { DModel as M, DStruct as DS } from 'win32-api'


// https://msdn.microsoft.com/zh-cn/library/windows/desktop/dd162805(v=vs.85).aspx
const point = new Struct(DS.POINT)()
const point: M.POINT_Struct = new Struct(DS.POINT)()
point.x = 100
point.y = 200
console.log(point)

// struct usage by ref-struct-di
import * as ref from 'ref-napi'
import * as StructDi from 'ref-struct-di'
import { DModel as M, DStruct as DS } from 'win32-api'


const Struct = StructDi(ref)
const point: M.POINT_Struct = new Struct(DS.POINT)()
point.x = 100
point.y = 200
console.log(point)

// Should output like below:
// { x: 100,
//   y: 200,
//   'ref.buffer': <Buffer@0x048BB9F8 64 00 00 00 c8 00 00 00>
// }
```

```ts
import * as ref from 'ref'
import { K } from 'win32-api'
import { FModel as FM, DTypes as W } from 'win32-def'


const knl32 = K.load()
const buf  = <FM.Buffer> Buffer.alloc(4)   // ← here the types

buf.writeInt32LE(12345, 0)

// const hInstance =<FM.Buffer> Buffer.alloc(process.arch === 'x64' ? 8 : 4);
const hInstance = <FM.Buffer> ref.alloc(W.HINSTANCE)    // W.HINSTANCE is 'int64*' under x64, 'int32*' under ia32
knl32.GetModuleHandleExW(0, null, hInstance)
```


## 相关文档
- [Windows Api documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/ff468919%28v=vs.85%29.aspx)
- [Windows Data Types](https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751#DWORD)
- [System Error Codes](https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381%28v=vs.85%29.aspx)
- [FFI doc](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)



## 版权
[MIT](LICENSE)

### Languages
- [English](README.md)
- [中文](README.zh-CN.md)
