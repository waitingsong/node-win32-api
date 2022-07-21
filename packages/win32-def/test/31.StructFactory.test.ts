import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { StructFactory } from '../src/index.js'
import * as DS from '../src/index.struct.js'
import * as DU from '../src/index.union.js'
import * as ST from '../src/lib/struct/index.struct.types.js'

import { ast_PRINTER_INFO_1 } from './asserts/asserts.PRINTER_DEFAULTS.js'


describe(fileShortPath(import.meta.url), () => {

  it('PRINTER_INFO_1 struct should work', () => {
    const struct = StructFactory<ST.PRINTER_INFO_1>(DS.PRINTER_INFO_1)
    assert(struct)
    ast_PRINTER_INFO_1(struct)

    const { Flags, pDescription, pName, pComment } = struct
    assert(typeof Flags === 'number')
    assert(typeof pDescription === 'string')
    assert(typeof pName === 'string')
    assert(typeof pComment === 'string')

    assert(pName.length === 0)
    const rnd = 'foo'
    struct.pName = rnd
    assert(pName.length === 0)
    assert(struct.pName.length === 3)
    assert(struct.pName === rnd)
  })

})

