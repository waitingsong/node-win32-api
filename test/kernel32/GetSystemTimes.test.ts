/// <reference types="node" />
/// <reference types="mocha" />

import { basename } from 'path'
import * as assert from 'power-assert'
import {
    DModel as M,
    DStruct as DS,
} from 'win32-def'

import {
    knl32,
    Struct,
} from './helper'

const filename = basename(__filename)

describe(filename, () => {

  const fileTimeClass = Struct(DS.FILETIME)

  it('invoke GetSystemTime', () => {
    const idleTime: M.FILETIME_Struct = new fileTimeClass()
    const kernelTime: M.FILETIME_Struct = new fileTimeClass()
    const userTime: M.FILETIME_Struct = new fileTimeClass()

    knl32.GetSystemTimes(idleTime.ref(), kernelTime.ref(), userTime.ref())
    assert(fileTimeToNumber(idleTime) > 0)
    assert(fileTimeToNumber(kernelTime) > 0)
    assert(fileTimeToNumber(userTime) > 0)
  })

  it('invoke GetSystemTime async', () => {
    const idleTime: M.FILETIME_Struct = new fileTimeClass()
    const kernelTime: M.FILETIME_Struct = new fileTimeClass()
    const userTime: M.FILETIME_Struct = new fileTimeClass()

    knl32.GetSystemTimes.async(idleTime.ref(), kernelTime.ref(), userTime.ref(), err => {
      if (err) {
        return assert(false, err.message ? err.message : 'unknown error')
      }
      assert(fileTimeToNumber(idleTime) > 0)
      assert(fileTimeToNumber(kernelTime) > 0)
      assert(fileTimeToNumber(userTime) > 0)
    })
  })
})

function fileTimeToNumber(fileTime: M.FILETIME_Struct): number {
  return fileTime.dwLowDateTime + fileTime.dwHighDateTime * Math.pow(2, 32)
}
