import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import { validateWinData } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'validateWinData()'

  it(`Should ${fnName} works)`, () => {
    const srcMap = new Set(['int'])

    try {
      validateWinData({ BOOL: 'int' }, srcMap)
      assert(true)
    }
    catch (ex) {
      return assert(false, 'should passed, but throw error')
    }

    try {
      validateWinData({ BOOL: 'float' }, srcMap)
      return assert(false, 'should throw error with invalid value, but NOT')
    }
    catch (ex) {
      assert(true)
    }

    try {
      validateWinData({ [Symbol.for('test')]: 'int' }, srcMap)
      return assert(false, 'should throw error with invalid value, but NOT')
    }
    catch (ex) {
      assert(true)
    }

    try {
      validateWinData({ 7: 'int' }, srcMap)
      return assert(false, 'should throw error with invalid value, but NOT')
    }
    catch (ex) {
      assert(true)
    }

    try {
      validateWinData({ '': 'int' }, srcMap)
      return assert(false, 'should throw error with invalid value, but NOT')
    }
    catch (ex) {
      assert(true)
    }

    try {
      validateWinData({ '': 'float' }, srcMap)
      return assert(false, 'should throw error with invalid value, but NOT')
    }
    catch (ex) {
      assert(true)
    }

  })
})

