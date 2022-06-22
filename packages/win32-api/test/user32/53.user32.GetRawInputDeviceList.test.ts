import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { user32, Struct } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {
  it('GetRawInputDeviceList()', () => {
    const limit = 255
    const rawInputDeviceList: M.RAWINPUTDEVICELIST_Struct = new Struct(DS.RAWINPUTDEVICELIST)() as M.RAWINPUTDEVICELIST_Struct
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

