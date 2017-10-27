/**
 * Create a window and receive events
 * window closed after 30sec if event triggered
 *
 * @CLI ts-node ./create_window.ts
 * @author waiting
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as ffi from 'ffi';
import * as ref from 'ref';
import * as Struct from 'ref-struct';


// import {K, U, C, DS, types as GT, windef as W} from 'win32-api'; // as module 
import {K, U, C, DS, types as GT, windef as W} from '../src/index'; // as local



const kernel32 = K.load();
const user32 = U.load();  // load all apis defined in lib/{dll}/api from user32.dll
const comctl32 = C.load();  // load all apis defined in lib/{dll}/api from user32.dll


// WndProc
const WndProc = ffi.Callback('uint32',
    [W.HWND, W.UINT, W.WPARAM, W.LPARAM],
    (hwnd: GT.HWND, uMsg: GT.UINT, wParam: GT.WPARAM, lParam: GT.LPARAM) => {
        console.log('WndProc callback: ', uMsg, wParam, lParam);
        let result = 0;
        switch (uMsg) {
            default:
                result = user32.DefWindowProcW(<GT.FFIBuffer> hwnd, uMsg, wParam, lParam);
                break;
        }
        console.log('Sending LRESULT: ' + result + '\n');
        return result;
    }
);
const className = Buffer.from('NodeClass\0', 'ucs-2');
const windowName = Buffer.from('Node.js WinForms App\0', 'ucs-2');

//const hmodule = kernel32.GetModuleHandleW(null);
// hInstance
//let hInstance = Buffer.alloc(8);
const hInstance = ref.alloc(W.HINSTANCE);
kernel32.GetModuleHandleExW(0, null, hInstance);

// Common Controls
const icc = new Struct(DS.INITCOMMONCONTROLSEX)();

icc.dwSize = 8;
icc.dwICC = 0x40ff;
comctl32.InitCommonControlsEx(icc.ref());


// Window Class
const wClass = new Struct(DS.WNDCLASSEX)();

wClass.cbSize =  W._WIN64 ? 80 : 48; // x86 = 48, x64=80
wClass.style = 0;
wClass.lpfnWndProc = WndProc;
wClass.cbClsExtra = 0;
wClass.cbWndExtra = 0;
wClass.hInstance = hInstance;
wClass.hIcon = null;
wClass.hCursor = null;
wClass.hbrBackground = null;
wClass.lpszMenuName = null;
wClass.lpszClassName = className;
wClass.hIconSm = null;

if (!user32.RegisterClassExW(wClass.ref())) {
    throw new Error('Error registering class');
}
const hWnd = user32.CreateWindowExW(
    0,
    className,
    windowName,
    0xcf0000, // overlapped window
    1 << 31, // use default
    1 << 31,
    320,
    200,
    null,
    null,
    hInstance,
    null
);

user32.ShowWindow(hWnd, 1);
user32.UpdateWindow(hWnd);

// message loop
const msg = new Struct(DS.MSG)();
const point = new Struct(DS.POINT)();

msg.pt = point.ref();

let count = 0;
const countLimit = 200;
const start = new Date().getTime();
const ttl = 30; // sec

while (count < countLimit && user32.GetMessageW(msg.ref(), null, 0, 0)) {
    count++;
    if (new Date().getTime() - start > ttl * 1000) {
        console.log('timeout and exit.');
        break;
    }
    user32.TranslateMessageEx(msg.ref());
    user32.DispatchMessageW(msg.ref());
}
