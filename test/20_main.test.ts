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

describe(filename, () => {
    for (let dll of dlls) {
        const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase(); // User32, Kernel32, ...
        const module: any = Win[apiName];

        if (module && module.api) {
            const apiDef = <GT.Win32FnDef> module.api;

            it(`Should ${apiName}: Win32FnName of definition be string`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    assert(typeof x === 'string');
                }
            });

            it(`Should ${apiName}: Win32FnParams of definition be array`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x];
                    assert(typeof p === 'object' && Array.isArray(p), `${x}()`);
                }
            });

            it(`Should ${apiName}: Win32FnRetType of definition be string and not epmty`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x];
                    assert(typeof p[0] === 'string' && p[0], `${x}() p[0]`);
                }
            });

            it(`Should ${apiName}: Win32FnRetType of definition exists in conf.windefSet`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x][0];
                    assert(windefSet.has(p), `${x}() value: "${p}"`);
                }
            });

            it(`Should ${apiName}: Win32FnCallParams of definition be array`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x];
                    assert(typeof p[1] === 'object' && Array.isArray(p[1]), `${x}()`);
                }
            });

            it(`Should ${apiName}: item of Win32FnCallParams of definition be string or void`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const arr = apiDef[x][1];
                    const len = arr.length;

                    if (len) {
                        for (let i = 0; i < len; i++) {
                            assert(typeof arr[i] === 'string' && arr[i], `${x}() [${i}]`);
                        }
                    }
                }
            });

            it(`Should ${apiName}: item of Win32FnCallParams of definition exists in conf.windefSet`, function() {
                if (windefSet && windefSet.size) {
                    for (let x in apiDef) {    // tslint:disable-line
                        const arr = apiDef[x][1];
                        const len = arr.length;

                        if (len) {
                            for (let i = 0; i < len; i++) {
                                const p = arr[i];

                                if (typeof p === 'string') {
                                    assert(windefSet.has(p), `${x}() value: "${p}"`);
                                }
                                else {
                                    assert(false, `${p} not typeof string`);
                                }
                            }
                        }
                    }
                }
            });

        }
        else {
            assert(true);
        }

    }   // loop END
});


describe(filename, () => {
    for (let dll of dlls) {
        const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase(); // User32, Kernel32, ...
        const module: any = Win[apiName];

        if (module && module.api) {
            try {
                const api: GT.Win32FnDef = module.load();

                for (let fn in api) {
                    if (!{}.hasOwnProperty.call(api, fn)) {
                        continue;
                    }
                    it(`Should ${apiName}.${fn}() be typeof "function"`, function() {
                        assert(typeof api[fn] === 'function', `${fn}`);
                    });
                }
            }
            catch (ex) {
                assert.throws(() => {
                    throw ex;
                }, /dll init failed/);
            }
        }
    }
});

