/// <reference types="mocha" />

import { basename } from '@waiting/shared-core'
import * as assert from 'power-assert'

import {
  settingsDefault,
  windefSet,
  _UNICODE,
  _WIN64,
} from '../src/lib/config'

const filename = basename(__filename)

describe(filename, () => {
  it('Should items of windefSet must be typeof string and not empty', () => {
    for (const vv of windefSet) {
      assert(typeof vv === 'string', 'value must be string')
      assert(vv.length, 'value must be not empty string')
    }
  })

  it('Should value of _WIN64 correctly', () => {
    const WIN64 = process.arch === 'x64' ? true : false

    assert(WIN64 === _WIN64)
  })

  it('Should value of settingsDefault correctly', () => {
    const st = settingsDefault

    assert(st._UNICODE === _UNICODE)
    assert(st._WIN64 === _WIN64)
  })
})
