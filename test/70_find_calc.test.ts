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

            if (hWnd && !hWnd.isNull() && ref.address(hWnd)) {
                assert(true);
            }
            else {
                assert(false, 'found no calc window, GetLastError: ' + knl32.GetLastError());
            }

            child.kill();
            done();
        }, 1000);

    });
});
