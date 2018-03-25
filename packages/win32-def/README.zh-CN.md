# win32-def
Definitions of Windows Date Types for [node-ffi](https://github.com/node-ffi/node-ffi)

[![Version](https://img.shields.io/npm/v/win32-def.svg)](https://www.npmjs.com/package/win32-def)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/waitingsong/node-win32-def.svg?branch=master)](https://travis-ci.org/waitingsong/node-win32-def)
[![Build status](https://ci.appveyor.com/api/projects/status/8g4ud87q0mnys6tg/branch/master?svg=true)](https://ci.appveyor.com/project/waitingsong/node-win32-def/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/waitingsong/node-win32-def/badge.svg)](https://coveralls.io/github/waitingsong/node-win32-def)



## 用途
通过 [node-ffi](https://github.com/node-ffi/node-ffi) 调用系统 `win32` 接口方法时提供 ```TypeScript``` 类型支持

## 安装
```powershell
npm install --save win32-def
```

## 使用
```ts
// struct usage by ref-struct
import * as Struct from 'ref-struct'
import {DStruct as DS} from 'win32-def';


// https://msdn.microsoft.com/zh-cn/library/windows/desktop/dd162805(v=vs.85).aspx
const point = new Struct(DS.POINT)();
point.x = 100;
point.y = 200;
console.log(point);
```

```ts
import * as ref from 'ref';
import {K} from 'win32-api';
import {DModel as DM, DTypes as DT} from 'win32-def';


const knl32 = K.load();
const buf  = <DM.FFIBuffer> Buffer.alloc(4);   // ← here the types

buf.writeInt32LE(12345, 0);

// const hInstance =<DT.FFIBuffer> Buffer.alloc(process.arch === 'x64' ? 8 : 4);
const hInstance = <DM.FFIBuffer> ref.alloc(DT.HINSTANCE);    // W.HINSTANCE is 'int64*' under x64, 'int32*' under ia32
knl32.GetModuleHandleExW(0, null, hInstance);
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
