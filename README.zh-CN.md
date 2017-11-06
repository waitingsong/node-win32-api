# win32-api
Windows win32 api 接口定义

[![Version](https://img.shields.io/npm/v/win32-api.svg)](https://www.npmjs.com/package/win32-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg)
[![Build status](https://ci.appveyor.com/api/projects/status/nrivtykm5uf84fbl/branch/master?svg=true)](https://ci.appveyor.com/project/waitingsong/node-win32-api/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/waitingsong/node-win32-api/badge.svg)](https://coveralls.io/github/waitingsong/node-win32-api)


## 用途
用于 Node.js 通过 [node-ffi](https://github.com/node-ffi/node-ffi) 调用系统user32.dll, kerner32.dll, comctl32.dll 等动态链接库提供的函数

## 安装
```powershell
npm install --save win32-api
```

## 使用
```js
// 查询计算器程序窗口句柄（需要先手动运行一个计算器）
/**
 * 导出的模块:
 * U, User32 for user32 from lib/user32/api
 * K, Kernel32 for kernel32 from lib/kernel32/api
 * C, Comctl32 for Comctl32 from lib/comctl32/api
 * DS, DStruct for dict of defined struct from lib/struct
 */
const {K, U} = require('win32-api');   // or {Kernel32, User32}
const ref = require('ref');

const knl32 = K.load();
const user32 = U.load();  // 初始化 lib/{dll}/api 文件中定义的所有函数
// const user32 = U.load(['FindWindowExW']);  // 仅加载 user32.dll 的 FindWindowExW 函数

const title = '计算器\0';    // null-terminated string 字符串必须以\0即null结尾!
// const title = 'Calculator\0';

const lpszWindow = Buffer.from(title, 'ucs2');
const hWnd = user32.FindWindowExW(null, null, null, lpszWindow);

if (hWnd && ! hWnd.isNull()) {
    // Caution: output hWnd will cuase exception in the following process, even next script!
    // So do NOT do this in the production code!
    // console.log('buf: ', hWnd); // avoid this

    console.log('buf: ', ref.address(hWnd)); // this is ok

    // Change title of the Calculator
    const res = user32.SetWindowTextW(hWnd, Buffer.from('Node-Calculator\0', 'ucs2'));

    if ( ! res) {
        // See: [System Error Codes] below
        const errcode = knl32.GetLastError();
        const len = 255;
        const buf = Buffer.alloc(len);
        const p = 0x00001000 | 0x00000200;  // FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS
        const langid = 0x0409;              // 0x0409: US, 0x0000: Neutral locale language
        const msglen = knl32.FormatMessageW(p, null, errcode, langid, buf, len, null);
        if (msglen) {
            console.log(ref.reinterpretUntilZeros(buf, 2).toString('ucs2'));
        }
    }
    else {
        console.log('计算器程序窗口标题修改成功');
    }
}

```

```js
// use the types exposed by the module for TypeScript dev
import {U, types as GT} from 'win32-api';
import * as ref from 'ref';

// so we can all agree that a buffer with the int value written
// to it could be represented as an "int *"
const buf  = Buffer.alloc(4);
buf.writeInt32LE(12345, 0);

const hex = ref.hexAddress(buf);
console.log(typeof hex);
console.log(hex);  // ← '7FA89D006FD8'

buf.type = ref.types.int;  // @ts-ignore

// now we can dereference to get the "meaningful" value
console.log(ref.deref(buf));  // ← 12345
```

```js
// 通过 ref-struct 模块生成 struct 接口数据
import * as Struct from 'ref-struct';
import {DS} from 'win32-api';

// https://msdn.microsoft.com/zh-cn/library/windows/desktop/dd162805(v=vs.85).aspx
const point = new Struct(DS.POINT)();
point.x = 100;
point.y = 200;
console.log(point);
```

```js
// usage of types and windef:
import {K, types as GT, windef as W} from 'win32-api';
import * as ref from 'ref';

const knl32 = K.load();

const buf  = <GT.FFIBuffer> Buffer.alloc(4);   // ← here the types
buf.writeInt32LE(12345, 0);

// const hInstance =<GT.FFIBuffer> Buffer.alloc(process.arch === 'x64' ? 8 : 4);
const hInstance = <GT.FFIBuffer> ref.alloc(W.HINSTANCE);    // W.HINSTANCE is 'int64*' under x64, 'int32*' under ia32
knl32.GetModuleHandleExW(0, null, hInstance);
```

## Demo
- [create_window](https://github.com/waitingsong/node-win32-api/blob/master/demo/create_window.ts)


## 依赖安装问题
- If installation of node-gyp fails:
Check out [node-gyp](https://github.com/nodejs/node-gyp) and [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

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
