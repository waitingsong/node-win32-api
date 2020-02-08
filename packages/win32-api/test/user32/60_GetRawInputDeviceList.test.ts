import { basename } from 'path'

import * as assert from 'power-assert'
import * as ffi from 'ffi-napi'
import * as ref from 'ref-napi'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { user32, Struct } from '../helper'


const filename = basename(__filename)

describe(filename, () => {
  it('GetRawInputDeviceList()', () => {
    const pRawInputDeviceList: M.RAWINPUTDEVICELIST_Struct = new Struct(DS.RAWINPUTDEVICELIST)()
    const limit = 255
    const puiNumDevices = Buffer.alloc(4)
    puiNumDevices[0] = limit
    const buf = Buffer.alloc(pRawInputDeviceList.ref().byteLength * limit)
    const nDevices = user32.GetRawInputDeviceList(
      buf,
      puiNumDevices,
      pRawInputDeviceList.ref().byteLength,
    )
    // console.log(buf)
    console.log({ nDevices, puiNumDevices })
    assert(nDevices > 0 && nDevices <= limit)
  })
})

