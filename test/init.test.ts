/// <reference types="mocha" />
/// <reference types="node" />

import * as fs from 'fs';
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
        const module = Win[apiName];

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
