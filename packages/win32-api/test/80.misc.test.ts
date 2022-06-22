import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import {
  DModel as M,
  DStruct as DS,
} from 'win32-def'

import { Struct } from './helper.js'


describe(fileShortPath(import.meta.url), () => {

  it('Should ref-struct-di initialized correctly', () => {
    // const point: M.POINT_Struct = new Struct(DS.POINT)()
    const point = new Struct(DS.POINT)()
    point.x = 100
    point.y = 200

    assert(point.x === 100)
    assert(point.y === 200)
    assert(Buffer.isBuffer(point.ref()))
  })

})

