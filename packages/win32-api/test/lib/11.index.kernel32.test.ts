import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  apiDef,
  dllName,
  load,
} from '##/index.kernel32.js'
import { DllNames } from '##/lib/types.js'


describe(fileShortPath(import.meta.url), () => {
  it('Should exports work', () => {
    assert(dllName === DllNames.kernel32)
    assert(Object.keys(apiDef).length > 0)
    assert(typeof load === 'function')
  })
})
