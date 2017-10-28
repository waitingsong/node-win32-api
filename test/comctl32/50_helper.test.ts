/// <reference types="node" />
/// <reference types="mocha" />

import * as fs from 'fs';
import * as ffi from 'ffi';
import {basename, normalize} from 'path';
import * as assert from 'power-assert';
import * as Win from '../../src/index';
import * as Conf from '../../src/lib/conf';
import * as GT from '../../src/lib/types';
import * as H from '../../src/lib/helper';
import * as WD from '../../src/lib/windef';
import {windefSet} from '../../src/lib/conf';

const filename = basename(__filename);
const dllDir = normalize(__dirname + '/../../src/lib/');

describe(filename + ' :gen_api_opts() specify', () => {
    const apiName = 'Comctl32';
    const module: any = Win[apiName];
    const fn = 'InitCommonControlsEx';
    const fakeFn = fn + Math.random();

    if (module && module.apiDef) {
        const api: GT.ApiDef = module.apiDef;

        it(`Should ${apiName} gen_api_opts(["${fn}"]) correctly)`, function() {
            const fns: GT.ApiDef = H.gen_api_opts(api, [fn]);

            const keysize = Object.keys(fns).length;

            assert(keysize === 1);
            assert(typeof fns[fn] === 'object' && fns[fn]);
        });

        it(`Should ${apiName} gen_api_opts(["${fakeFn}"]) return none)`, function() {
            const fns: GT.ApiDef = H.gen_api_opts(api, [fakeFn]);
            const keysize = Object.keys(fns).length;

            assert(keysize === 0);
            assert(typeof fns[fakeFn] === 'undefined');
        });
    }
    else {
        assert(false, 'module or module.apiDef invalie');
    }
});

