import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../../src/lib/config.js'
import { _lookupRef } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = '_lookupRef'

  it(`Should ${fnName}() works)`, () => {
    const ww = { Fake: 'PVOID' }
    const fakeValue = 'vooid'
    const macroSrc: Map<string, string> = new Map()

    macroSrc.set('PVOID', fakeValue)

    let ret = _lookupRef('PVOID', ww, macroSrc)
    assert(ret === fakeValue, `should got result "${fakeValue}, but got "${ret}" `)

    ret = _lookupRef('fakekey', ww, macroSrc)
    assert(ret === '', `should got blank result , but got "${ret}" `)

  })
})

