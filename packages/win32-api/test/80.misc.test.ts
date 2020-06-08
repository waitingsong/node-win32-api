/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { basename } from 'path'

import * as assert from 'power-assert'
import {
  DModel as M,
  DStruct as DS,
} from 'win32-def'

import { Struct } from './helper'


const filename = basename(__filename)

describe(filename, () => {

  it('Should ref-struct-di initialized correctly', () => {
    const point: M.POINT_Struct = new Struct(DS.POINT)()
    point.x = 100
    point.y = 200

    assert(point.x === 100)
    assert(point.y === 200)
    assert(Buffer.isBuffer(point.ref()))
  })

})

