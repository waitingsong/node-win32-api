/// <reference types="node" />
/// <reference types="mocha" />

import * as fs from 'fs';
import * as ffi from 'ffi';
import {basename, normalize} from 'path';
import * as assert from 'power-assert';
import * as Win from '../src/index';
import * as GT from '../src/lib/types';
import * as H from '../src/lib/helper';
import {windefSet} from '../src/lib/conf';

const filename = basename(__filename);
const dllDir = normalize(__dirname + '/../src/lib/');
const dlls = <string[]> [];

for (let key of fs.readdirSync(dllDir)) {
    const stat = fs.statSync(normalize(dllDir + key));
    if (stat.isDirectory()) {
        dlls.push(key);
    }
}


describe(filename + ' :gen_api_opts() all', () => {
    for (let dll of dlls) {
        const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase(); // User32, Kernel32, ...
        const module: any = Win[apiName];

        if (module && module.api) {
            const api = module.api;
            let n = 0;

            for (let fn in api) {
                if (!{}.hasOwnProperty.call(api, fn)) {
                    continue;
                }
                n += 1;
            }

            it(`Should ${apiName} number of fns equal to the number of fns return by gen_api_opts`, function() {
                const fns: GT.Win32FnDef = H.gen_api_opts(api);
                const keysize = Object.keys(fns).length;

                assert(typeof fns === 'object' && fns, `fns return by gen_api_opts() not object`);
                assert(keysize === n, `the items of fns ${keysize} not equal to the ${n} numbers of item of the Win.${apiName}`);
            });
        }
        else {
            assert(true);
        }
    }
});


describe(filename + ' :gen_api_opts() specify', () => {
    const apiName = 'Kernel32';
    const module: any = Win[apiName];
    const fn = 'GetLastError';
    const fakeFn = fn + Math.random();

    if (module && module.api) {
        const api = module.api;

        it(`Should ${apiName} gen_api_opts(["${fn}"]) correctly)`, function() {
            const fns: GT.Win32FnDef = H.gen_api_opts(api, [fn]);

            const keysize = Object.keys(fns).length;

            assert(keysize === 1);
            assert(typeof fns[fn] === 'object' && fns[fn]);
        });

        it(`Should ${apiName} gen_api_opts(["${fakeFn}"]) return none)`, function() {
            const fns: GT.Win32FnDef = H.gen_api_opts(api, [fakeFn]);
            const keysize = Object.keys(fns).length;

            assert(keysize === 0);
            assert(typeof fns[fakeFn] === 'undefined');
        });
    }
    else {
        assert(true);
    }
});
