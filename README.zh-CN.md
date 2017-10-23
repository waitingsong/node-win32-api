# win32-api
Windows win32 api 接口定义

[![Version](https://img.shields.io/npm/v/win32-api.svg)](https://www.npmjs.com/package/win32-api)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
![Available platform](https://img.shields.io/badge/platform-win32-blue.svg)
[![Build Status](https://travis-ci.org/waitingsong/node-win32-api.svg?branch=master)](https://travis-ci.org/waitingsong/node-win32-api)
[![Build status](https://ci.appveyor.com/api/projects/status/nrivtykm5uf84fbl/branch/master?svg=true)](https://ci.appveyor.com/project/waitingsong/node-win32-api/branch/master)




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
    // 注意：输出hWnd buffer值将会导致后续代码异常，甚至重新运行脚本时也会如此。可能是底层(ffi)在释放资源上的锁定导致的
    // 所以不要在生产环境中打印输出!
    console.log('buf: ', hWnd); // be careful this cmd will cause

    // 通常我们不需要了解句柄值，只需要使用即可。如果有需要，可通过以下代码获取hWnd缓冲区的句柄值
    const hWndDec = process.arch === 'x64' ? hWnd.ref().readUInt64LE() : hWnd.ref().readUInt32LE(0);    // readUInt32LE() 是原生方法，需要offse参数
    console.log(hWndDec);

    // 更改计算器窗口标题
    const res = user32.SetWindowTextW(hWnd, Buffer.from('Node-计算器\0', 'ucs2'));
    if ( ! res) {
        // 如果执行异常，获取错误代码并通过 FormatMessageW() 函数获取对应的错误信息
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
}

```

```js
// use the types exposed by the module for TypeScript dev
import {U} from 'win32-api';
import * as ref from 'ref';

// so we can all agree that a buffer with the int value written
// to it could be represented as an "int *"
const buf  = <U.types.FFIBuffer> Buffer.alloc(4);   // ← here the types
buf.writeInt32LE(12345, 0);

const hex = buf.hexAddress();   // no error tips cause of typeof U.types.FFIBuffer
console.log(typeof hex);
console.log(buf.hexAddress());  // ← '7FA89D006FD8'

buf.type = ref.types.int;  // @ts-ignore

// now we can dereference to get the "meaningful" value
console.log(buf.deref());  // ← 12345
```

```js
// 通过 ref-struct 模块生成 struct 接口数据
import Struct from 'ref-struct';
import {DS} from 'win32-api';

// https://msdn.microsoft.com/zh-cn/library/windows/desktop/dd162805(v=vs.85).aspx
const point = (new Struct(DS.POINT))();
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
