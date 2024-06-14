/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from '@lwahonen/ref-napi'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { user32Sync } from '../helper.js'
import { CI } from '../root.config.js'


describe(fileShortPath(import.meta.url), () => {
  it('EnumDisplayDevicesW()', () => {
    const dd = StructFactory<M.DISPLAY_DEVICEW>(DS.DISPLAY_DEVICEW)
    dd.cb = dd.ref().byteLength

    const ret = user32Sync.EnumDisplayDevicesW(ref.NULL, 0, dd.ref(), 0)
    assert(ret)
    const {
      DeviceID,
      DeviceKey,
      DeviceName,
      DeviceString,
    } = dd
    console.log({
      DeviceID,
      DeviceKey,
      DeviceName,
      DeviceString,
    })

    assert(DeviceID.startsWith('PCI\\VEN_') || DeviceID.includes('VMBUS') || DeviceID === '', DeviceID)
    assert(typeof DeviceKey === 'string', DeviceKey)
    assert(DeviceName === '\\\\.\\DISPLAY1', DeviceName)
    assert(DeviceString.length > 0)
    const flag = ['Microsoft Hyper-V', 'Intel', 'AMD', 'Radeon'].some(val => DeviceString.includes(val))
    assert(flag === true, DeviceString)
  })

})

