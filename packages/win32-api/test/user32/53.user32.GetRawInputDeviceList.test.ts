import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { user32Sync } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {
  it('GetRawInputDeviceList()', () => {
    const limit = 64
    const rawInputDeviceList = StructFactory<M.RAWINPUTDEVICELIST>(DS.RAWINPUTDEVICELIST)
    const pRawInputDeviceList = Buffer.alloc(rawInputDeviceList.ref().byteLength * limit)
    const puiNumDevices = Buffer.alloc(4)
    puiNumDevices[0] = limit

    const nDevices = user32Sync.GetRawInputDeviceList(
      pRawInputDeviceList,
      puiNumDevices,
      rawInputDeviceList.ref().byteLength,
    )

    // console.log(buf)
    console.log({ nDevices, puiNumDevices })
    assert(nDevices > 0 && nDevices <= limit)
  })
})

