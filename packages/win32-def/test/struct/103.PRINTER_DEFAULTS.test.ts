import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { StructFactory } from '../../src/index.js'
import * as DS from '../../src/index.struct.js'
import * as DU from '../../src/index.union.js'
import * as ST from '../../src/lib/struct/index.struct.types.js'
import { ast_PRINTER_DEFAULTS } from '../asserts/asserts.PRINTER_DEFAULTS.js'


describe(fileShortPath(import.meta.url), () => {

  it('PRINTER_DEFAULTS struct should work', () => {
    const struct = StructFactory<ST.PRINTER_DEFAULTS>(DS.PRINTER_DEFAULTS)
    ast_PRINTER_DEFAULTS(struct)

  })

})

