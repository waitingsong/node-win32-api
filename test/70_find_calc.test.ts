/// <reference types="node" />
/// <reference types="mocha" />

import {spawn} from 'child_process';
import {basename, normalize} from 'path';
import * as ref from 'ref';
import * as assert from 'power-assert';
import * as Conf from '../src/lib/conf';
import * as GT from '../src/lib/types';
import * as WD from '../src/lib/windef';
import {K, U} from '../src/index';

const filename = basename(__filename);

const knl32 = K.load();
const user32 = U.load();

describe(filename, () => {
    it('Open a calc.exe and find it\'s window hWnd', function(done) {
        const child = spawn('calc.exe');

        setTimeout(() => {
            const lpszClass = Buffer.from('CalcFrame\0', 'ucs2');
            const hWnd = user32.FindWindowExW(null, null, lpszClass, null);

            if (hWnd && ! ref.isNull(hWnd) && ref.address(hWnd)) {
                assert(true);
            }
            else {
                assert(false, 'found no calc window, GetLastError: ' + knl32.GetLastError());
            }

            child.kill();
            done();
        }, 3000);
    });

    it('Open a calc.exe and change it\'s window title', function(done) {
        const child = spawn('calc.exe');

        setTimeout(() => {
            const lpszClass = Buffer.from('CalcFrame\0', 'ucs2');
            const hWnd = user32.FindWindowExW(null, null, lpszClass, null);

            if (hWnd && ! ref.isNull(hWnd) && ref.address(hWnd)) {
                const title = 'Node-Calculator\0';
                // Change title of the Calculator
                const res = user32.SetWindowTextW(hWnd, Buffer.from(title, 'ucs2'));

                if (!res) {
                    // See: [System Error Codes] below
                    const errcode = knl32.GetLastError();
                    const len = 255;
                    const buf = Buffer.alloc(len);
                    const p = 0x00001000 | 0x00000200;  // FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS
                    const langid = 0x0409;              // 0x0409: US, 0x0000: Neutral locale language
                    const msglen = knl32.FormatMessageW(p, null, errcode, langid, buf, len, null);

                    if (msglen) {
                        const errmsg = ref.reinterpretUntilZeros(buf, 2).toString('ucs2');
                        assert(false, `window found but change the title failed. errcode: ${errcode}, errmsg: "${errmsg}"`);
                    }
                }
                else {
                    const len = title.length;
                    const buf = Buffer.alloc(len * 2);
                    let str: string;

                    user32.GetWindowTextW(hWnd, buf, len);
                    str = buf.toString('ucs2').trim();
                    assert(str === title.trim(), `title should be changed to ${title}, bug got ${str}`);
                }
            }
            else {
                assert(false, 'found no calc window, GetLastError: ' + knl32.GetLastError());
            }

            child.kill();
            done();
        }, 1000);
    });

});
