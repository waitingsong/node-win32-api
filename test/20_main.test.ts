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

            it(`Should ${apiName}: FnName of definition be string`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    assert(typeof x === 'string');
                }
            });

            it(`Should ${apiName}: FnParams of definition be array`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x];
                    assert(typeof p === 'object' && Array.isArray(p), `${x}()`);
                }
            });

            it(`Should ${apiName}: FnRetType of definition be string and not epmty or array`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    test_param_return_type(apiDef[x][0], x);
                }
            });

            it(`Should ${apiName}: FnRetType of definition exists in conf.windefSet`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x][0];
                    let _WIN64 = true;
                    let param: GT.FnRetType;

                    param = H.parse_placeholder_arch(<GT.FnRetTypeMacro> p, _WIN64);
                    _WIN64 = false;
                    assert(windefSet.has(param), `${x}() value: "${param}" ${_WIN64 ? 'x64' : 'ia32'}`);
                    param = H.parse_placeholder_arch(<GT.FnRetTypeMacro> p, !_WIN64);
                    assert(windefSet.has(param), `${x}() value: "${param} ${_WIN64 ? 'x64' : 'ia32'}"`);
                }
            });

            it(`Should ${apiName}: FnCallParams of definition be array`, function() {
                for (let x in apiDef) {    // tslint:disable-line
                    const p = apiDef[x];
                    assert(typeof p[1] === 'object' && Array.isArray(p[1]), `${x}()`);
                }
            });

            it(`Should ${apiName}: item of FnCallParams of definition exists in conf.windefSet and valid`, function() {
                if (windefSet && windefSet.size) {
                    for (let x in apiDef) {    // tslint:disable-line
                        const arr = apiDef[x][1];
                        const len = arr.length;

                        if (len) {
                            for (let i = 0; i < len; i++) {
                                let param = arr[i];

                                // convert param like ['_WIN64_HOLDER_', 'int64', 'int32'] to 'int64' or 'int32'
                                if (param && Array.isArray(param)) {
                                    let _WIN64 = true;
                                    param = H.parse_placeholder_arch(<GT.FnRetTypeMacro> param, _WIN64);
                                    test_call_param(param, x, i);
                                    _WIN64 = false;
                                    param = H.parse_placeholder_arch(<GT.FnRetTypeMacro> param, _WIN64);
                                    test_call_param(param, x, i);
                                }
                                else {
                                    test_call_param(param, x, i);
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


function test_param_return_type(param: GT.MacroParam<string>, x: string): void {
    if (typeof param === 'string') {
        assert(param, `${x}() string value of returnType (p[0]) is empty string`);
    }
    else if (typeof param === 'object' && Array.isArray(param) && param.length) {
        for (let p of param) {
            test_param_return_type(p, x);
        }
    }
    else {
        assert(false, `${x}() string value of returnType (p[0]) is NEITHER string NOR array`);
    }
}

function test_call_param(param: GT.MacroParam<string>, x: string, i: number): void {
    if (typeof param === 'string') {
        assert(windefSet.has(param), `${x}() value: "${param} index: ${i}" is string but not exists in windefSet`);
    }
    // else if (typeof param === 'object' && Array.isArray(param) && param.length) {
    //     for (let p of param) {
    //         test_call_param(p, x, i);
    //     }
    // }
    else {
        assert(false, `${x}() string value of param (index: ${i}) is NEIGHER string NOR array`);
    }
}


