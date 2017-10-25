/// <reference types="node" />
/// <reference types="mocha" />

import {basename, normalize} from 'path';
import * as assert from 'power-assert';
import * as Conf from '../src/lib/conf';

const filename = basename(__filename);

describe(filename, () => {
    const windefSet: Set<string> = Conf.windefSet;

    it('Should items of windefSet must be typeof string and not empty', function() {
        for (let vv of windefSet) {
            assert(typeof vv === 'string', 'value must be string');
            assert(vv.length, 'value must be not empty string');
        }
    });

    it('Should value of _WIN64 correctly', function() {
        const _WIN64 = process.arch === 'x64' ? true : false;

        assert(_WIN64 === Conf._WIN64);
    });
});
