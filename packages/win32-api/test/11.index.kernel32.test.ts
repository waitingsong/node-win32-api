import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  apiDef,
  dllName,
  load,
} from '../src/index.kernel32.js'


describe(fileShortPath(import.meta.url), () => {
  it('Should exports work', () => {
    assert(dllName === 'kernel32')
    assert(Object.keys(apiDef).length > 0)
    assert(typeof load === 'function')
  })
})

