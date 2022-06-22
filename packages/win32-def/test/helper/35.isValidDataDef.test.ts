import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import { isValidDataDef } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'isValidDataDef()'

  it(`Should ${fnName} works)`, () => {
    const srcMap = new Set(['int'])

    try {
      isValidDataDef('int', srcMap)
      assert(true)
    }
    catch (ex) {
      return assert(false, 'should passed, but throw error')
    }

    try {
      isValidDataDef('float', srcMap)
      return assert(false, 'should throw error with invalid value, but NOT')
    }
    catch (ex) {
      assert(true)
    }

    try {
      isValidDataDef('', srcMap)
      return assert(false, 'should throw error with blank string, but NOT')
    }
    catch (ex) {
      assert(true)
    }

    try {
      isValidDataDef('int', new Set())
      return assert(false, 'should throw error with blank Set, but NOT')
    }
    catch (ex) {
      assert(true)
    }

  })
})

