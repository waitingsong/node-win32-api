import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { UnionFactory } from '../../src/index.js'
import * as DS from '../../src/index.struct.js'
import * as DU from '../../src/index.union.js'
import * as UT from '../../src/lib/union/index.union.types.js'
import {
  ast_pDevMode_DUMMYUNIONNAME,
  ast_pDevMode_DUMMYUNIONNAME2,
} from '../asserts/asserts.PRINTER_DEFAULTS.js'


describe(fileShortPath(import.meta.url), () => {

  it('DEVMODEW_DUMMYUNIONNAME should work', () => {
    const union = UnionFactory<UT.DEVMODEW_DUMMYUNIONNAME>(DU.DEVMODEW_DUMMYUNIONNAME)
    ast_pDevMode_DUMMYUNIONNAME(union)
  })

  it('DEVMODEW_DUMMYUNIONNAME2 should work', () => {
    const union = UnionFactory<UT.DEVMODEW_DUMMYUNIONNAME2>(DU.DEVMODEW_DUMMYUNIONNAME2)
    ast_pDevMode_DUMMYUNIONNAME2(union)
  })

})

