/// <reference types="node" />
/// <reference types="mocha" />

import {basename, normalize} from 'path';
import * as assert from 'power-assert';
import * as Conf from '../src/lib/conf';
import * as GT from '../src/lib/types';
import * as H from '../src/lib/helper';
import * as W from '../src/lib/windef';

const filename = basename(__filename);

describe(filename, () => {
    const types64_32 = new Set([
        'PVOID', 'HANDLE', 'HACCEL', 'HBITMAP',
        'HBRUSH', 'HCOLORSPACE', 'HCONV', 'HCONVLIST',
        'HCURSOR', 'HDC', 'HDDEDATA', 'HDESK',
        'HDROP', 'HDWP', 'HENHMETAFILE', 'HFILE',
        'HFONT', 'HGDIOBJ', 'HGLOBAL', 'HHOOK',
        'HICON', 'HINSTANCE', 'HKEY', 'HKL',
        'HLOCAL', 'HMENU', 'HMETAFILE', 'HMODULE',
        'HMONITOR', 'HPALETTE', 'HPEN', 'HRGN',
        'HRSRC', 'HSZ', 'HWINEVENTHOOK', 'HWINSTA',
        'HWND', 'LPHANDLE', 'SC_HANDLE', 'SERVICE_STATUS_HANDLE',
        'ULONG_PTR', 'DWORD_PTR', 'PDWORD_PTR', 'PSIZE_T', 'SIZE_T',
        'POINTER_32', 'POINTER_64', 'PHKEY',
    ]);
    const typesHalf = new Set([
        'HALF_PTR', 'UHALF_PTR',
    ]);

    test_arch(true, types64_32);
    test_arch(false, types64_32);

    test_arch_half(true, typesHalf);
    test_arch_half(false, typesHalf);
});

function test_arch(_WIN64: boolean, types64_32: Set<string>) {
    for (let vv of types64_32) {
        let param = W[vv];

        // convert param like ['_WIN64_HOLDER_', 'int64', 'int32'] to 'int64' or 'int32'
        if (param && Array.isArray(param)) {
            param = H.parse_placeholder_arch(<GT.Win32FnRetType[]> param, <boolean> _WIN64);
        }

        it(`Should ${vv}: value mathes nodejs ${ _WIN64 ? 'x64' : 'ia32' }`, function() {
            if (_WIN64) {
                assert(param.indexOf('64') > 2 && param.indexOf('32') === -1, `${vv}: ${param} at arch x64`);   // must use param not W[vv]
            }
            else {
                assert(param.indexOf('32') > 2 && param.indexOf('64') === -1, `${vv}: ${param} at arch ia32`);
            }
        });
    }
}

function test_arch_half(_WIN64: boolean, typesHalf: Set<string>) {
    for (let vv of typesHalf) {
        let param = W[vv];

        // convert param like ['_WIN64_HOLDER_', 'int64', 'int32'] to 'int64' or 'int32'
        if (param && Array.isArray(param)) {
            param = H.parse_placeholder_arch(<GT.Win32FnRetType[]> param, <boolean> _WIN64);
        }

        it(`Should ${vv}: value mathes nodejs ${ _WIN64 ? 'x64' : 'ia32' }`, function() {
            if (_WIN64) {
                const cond: boolean = param.indexOf('32') > 2 && param.indexOf('16') === -1 && param.indexOf('64') === -1;
                assert(cond, `${vv}: ${param} at arch x64`);   // must use param not W[vv]
            }
            else {
                const cond: boolean = param.indexOf('16') > 2 && param.indexOf('32') === -1 && param.indexOf('64') === -1;
                assert(cond, `${vv}: ${param} at arch ia32`);
            }
        });
    }
}

describe(filename, () => {
    const typesUnicode = new Set([
        'LPCTSTR', 'LPTSTR', 'PTBYTE', 'PTCHAR',
        'PTSTR', 'TBYTE', 'TCHAR',
    ]);

    unicode(true, typesUnicode);
    unicode(false, typesUnicode);
});

function unicode(_UNICODE: boolean, typesUnicode: Set<string>) {
    for (let vv of typesUnicode) {
        let param = W[vv];

        // convert param like ['_WIN64_HOLDER_', 'int64', 'int32'] to 'int64' or 'int32'
        if (param && Array.isArray(param)) {
            param = H.parse_placeholder_unicode(<GT.Win32FnRetType[]> param, <boolean> _UNICODE);
        }

        it(`Should macro ${vv}: value mathes setting of ANSI/UNICODE`, function() {
            if (_UNICODE) {
                const cond: boolean = param.indexOf('16') > 2 && param.indexOf('8') === -1;
                assert(cond, `${vv}: ${param} at UNICODE`);
            }
            else {
                // PTSTR == 'char*' under ia32
                const cond: boolean = (param.indexOf('8') > 2 || param === 'char*') && param.indexOf('16') === -1;
                assert(cond, `${vv}: ${param} at ANSI`);
            }
        });
    }
}
