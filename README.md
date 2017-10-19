# win32-api
FFI Definitions of Windows win32 apis for calling by NodeJS via [node-ffi](https://github.com/node-ffi/node-ffi)

## What can I do with this?
Calling win32 native functions come from user32.dll, kernel32.dll, comctl32.dll by javascript

## Installing
```powershell
npm install --save win32-api
```


## Usage
```js
// find calc's hWnd, need run a calculator program manually at first
/**
 * expose module:
 * U, User32 for user32
 * K, Kernel32 for kernel32
 * C, Comctl32 for Comctl32
 */
const {K, U} = require('win32-api');   // or {Kernel32, User32}
const ref = require('ref');

const knl32 = K();
const user32 = U();  // load all apis defined in lib/{dll}/api from user32.dll
// const user32 = U(['FindWindowExW']);  // load only one api defined in lib/{dll}/api from user32.dll

const title = 'Calculator\0';    // null-terminated string
// const title = '计算器\0';    // string in chinese

const lpszWindow = Buffer.from(title, 'ucs2');
const hWnd = user32.FindWindowExW(null, null, null, lpszWindow);

if (hWnd && ! hWnd.isNull()) {
    // Caution: output hWnd will cuase exception in the following process, even next script!
    // So do NOT do this in the production code!
    console.log('buf: ', hWnd); // be careful this cmd will cause

    // It's unnecessary to retrive the value of hWnd from the buffer usually, but can be this if needed:
    const hWndDec = process.arch === 'x64' ? hWnd.ref().readUInt64LE() : hWnd.ref().readUInt32LE(0);    // readUInt32LE() need offset param cause of native buffer
    console.log(hWndDec);

    // Change title of the Calculator
    const res = user32.SetWindowTextW(hWnd, Buffer.from('Node-Calculator\0', 'ucs2'));
    if ( ! res) {
        // See: [System Error Codes] below
        const errcode = knl32.GetLastError();
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

## Dependencies Troubleshooting
- If installation of node-gyp fails:
Check out [node-gyp](https://github.com/nodejs/node-gyp) and [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools)

## Relevant
- [Windows Api documentation](https://msdn.microsoft.com/en-us/library/windows/desktop/ff468919%28v=vs.85%29.aspx)
- [Windows Data Types](https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751#DWORD)
- [System Error Codes](https://msdn.microsoft.com/en-us/library/windows/desktop/ms681381%28v=vs.85%29.aspx)
- [FFI doc](https://github.com/node-ffi/node-ffi/wiki/Node-FFI-Tutorial)
- [ref doc](https://tootallnate.github.io/ref/)
- [ref-struct](https://github.com/TooTallNate/ref-struct)


## License
[MIT](LICENSE)