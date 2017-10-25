/// <reference types="node" />
/// <reference types="mocha" />

import {basename, normalize} from 'path';
import * as assert from 'power-assert';
import * as W from '../src/lib/windef';

const filename = basename(__filename);

describe(filename, () => {
    const _WIN64 = process.arch === 'x64' ? true : false;
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
    ]);
    const typesHalf = new Set([
        'HALF_PTR', 'UHALF_PTR',
    ]);

    it(`Should windef._WIN64 mathes running nodejs arch type (x64 or ia32)`, function() {
        assert(_WIN64 === W._WIN64);
    });

    for (let vv of typesHalf) {
        it(`Should ${vv}: value mathes nodejs arch type (x64 or ia32)`, function() {
            if (_WIN64) {
                assert(W[vv].indexOf('32') > 2 && W[vv].indexOf('16') === -1, `${vv}: ${W[vv]} at arch x64`);
            }
            else {
                assert(W[vv].indexOf('16') > 2 && W[vv].indexOf('32') === -1, `${vv}: ${W[vv]} at arch ia32`);
            }
        });
    }

    for (let vv of types64_32) {
        it(`Should ${vv}: value mathes nodejs arch type (x64 or ia32)`, function() {
            if (_WIN64) {
                assert(W[vv].indexOf('64') > 2 && W[vv].indexOf('32') === -1, `${vv}: ${W[vv]} at arch x64`);
            }
            else {
                assert(W[vv].indexOf('32') > 2 && W[vv].indexOf('64') === -1, `${vv}: ${W[vv]} at arch ia32`);
            }
        });
    }
});

describe(filename, () => {
    const _UNICODE = true;
    const typesUnicode = new Set([
        'LPCTSTR', 'LPTSTR', 'PTBYTE', 'PTCHAR',
        'PTSTR', 'TBYTE', 'TCHAR',
    ]);

    for (let vv of typesUnicode) {
        it(`Should ${vv}: value mathes setting of ANSI/UNICODE`, function() {
            if (_UNICODE) {
                assert(W[vv].indexOf('16') > 2, `${vv}: ${W[vv]} at UNICODE`);
            }
            else {
                assert(W[vv].indexOf('8') > 2, `${vv}: ${W[vv]} at ANSI `);
            }
        });
    }
});
