import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import { prepare_windef_ref } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'prepare_windef_ref'

  it(`Should ${fnName}() works)`, () => {
    const ww = { FAKE: 'fake' }
    const macroSrc: Map<string, string> = new Map()

    macroSrc.set('FAKE', '')

    try {
      prepare_windef_ref(ww, macroSrc)
      return assert(false, 'should throw error, but NOT')
    }
    catch (ex) {
      assert(true)
    }
  })
})

