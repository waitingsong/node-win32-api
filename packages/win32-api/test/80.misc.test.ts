import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  it('Should ref-struct-di initialized correctly', () => {
    const point = StructFactory<M.POINT>(DS.POINT)
    point.x = 100
    point.y = 200

    assert(point.x === 100)
    assert(point.y === 200)
    assert(Buffer.isBuffer(point.ref()))
  })

})

