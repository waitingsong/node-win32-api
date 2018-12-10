/// <reference types="mocha" />

import { basename } from 'path'
import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import * as StructDi from 'ref-struct-di'

import { DStruct as DS } from '../src/index'

const filename = basename(__filename)
const Struct = StructDi(ref)

describe(filename, () => {

  it('Should ref-struct-di initialized correctly)', () => {
    const point = new Struct(DS.POINT)()
    point.x = 100
    point.y = 200

    assert(point.x === 100)
    assert(point.y === 200)
    assert(Buffer.isBuffer(point.ref()))
  })

})
