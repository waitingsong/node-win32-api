/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { basename } from 'path'

import * as ffi from 'ffi-napi'
import * as assert from 'power-assert'
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
    const limit = 255
    const rawInputDeviceList: M.RAWINPUTDEVICELIST_Struct = new Struct(DS.RAWINPUTDEVICELIST)()
    const pRawInputDeviceList = Buffer.alloc(rawInputDeviceList.ref().byteLength * limit)
    const puiNumDevices = Buffer.alloc(4)
    puiNumDevices[0] = limit

    const nDevices = user32.GetRawInputDeviceList(
      pRawInputDeviceList,
      puiNumDevices,
      rawInputDeviceList.ref().byteLength,
    )

    // console.log(buf)
    console.log({ nDevices, puiNumDevices })
    assert(nDevices > 0 && nDevices <= limit)
  })
})

