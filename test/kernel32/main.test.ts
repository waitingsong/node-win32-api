/// <reference types="mocha" />
/// <reference types="node" />

import * as fs from 'fs';
import {basename, normalize} from 'path';
import * as assert from 'power-assert';
import * as Win from '../../src/index';
import * as GT from '../../src/lib/types';
import * as H from '../../src/lib/helper';
import {windefSet} from '../../src/lib/conf';

const dllName = basename(__dirname);
const filename = basename(__filename);

describe(`${dllName}/${filename}`, () => {
    const apiName: string = dllName.slice(0, 1).toUpperCase() + dllName.slice(1).toLowerCase(); // User32, Kernel32, ...
    const module = Win[apiName];

    if (module && module.api) {
        try {
            const api: GT.Win32FnDef = module.load();

            for (let fn in api) {
                if ( ! {}.hasOwnProperty.call(api, fn)) {
                    continue;
                }
                it(`Should ${apiName}.${fn}() be typeof "function"`, function() {
                    assert(typeof api[fn] === 'function', `${fn}`);
                });
            }

        }
        catch (ex) {
            console.error(ex);
            process.exit(1);
        }
    }
});
