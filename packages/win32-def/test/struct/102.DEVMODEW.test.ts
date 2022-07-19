import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { StructFactory } from '../../src/index.js'
import * as DS from '../../src/index.struct.js'
import * as DU from '../../src/index.union.js'
import * as ST from '../../src/lib/struct/index.struct.types.js'
import { ast_DEVMODEWStruct } from '../asserts/asserts.PRINTER_DEFAULTS.js'


describe(fileShortPath(import.meta.url), () => {

  it('DEVMODEW struct should work', () => {
    const struct = StructFactory<ST.DEVMODEW>(DS.DEVMODEW)
    ast_DEVMODEWStruct(struct)
  })

})

