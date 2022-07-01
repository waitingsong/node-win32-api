import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  config,
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { user32Sync } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {
  it('Should GetRawInputDeviceInfoW() calling passed', () => {
    const limit = 64
    const rawInputDeviceList = StructFactory<M.RAWINPUTDEVICELIST>(DS.RAWINPUTDEVICELIST)
    const byteLen = rawInputDeviceList.ref().byteLength
    console.log({ byteLen })
    const pRawInputDeviceList = Buffer.alloc(byteLen * limit)
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

    const delta = config._WIN64 ? 8 : 4
    const readFn = config._WIN64 ? 'readBigUInt64LE' : 'readUInt32LE'

    let offset = 0
    let count = 0
    while (count < nDevices) {
      const hDevice: number | bigint = pRawInputDeviceList[readFn](offset)
      offset += delta
      const dwType = pRawInputDeviceList.readUInt32LE(offset)
      offset += delta
      count += 1
      console.log({ count, hDevice, dwType })

      const pcbSize = Buffer.alloc(4)
      const buf = Buffer.alloc(255)

      const nameLen = user32Sync.GetRawInputDeviceInfoW(
        hDevice.toString(),
        0x20000007,
        buf,
        pcbSize,
      )
      console.log({
        nameLen,
        pcbSize,
        buf: buf.toString('ucs2').replace(/\0/ug, ''),
      })

      const pData = StructFactory<M.RID_DEVICE_INFO>(DS.RID_DEVICE_INFO)
      pData.cbSize = pData.ref().byteLength

      const infoLen = user32Sync.GetRawInputDeviceInfoW(
        hDevice.toString(),
        0x2000000b,
        pData.ref(),
        pcbSize,
      )
      assert(pData)
      console.log({
        infoLen,
        pcbSize,
      })
      assert(pData.DUMMYUNIONNAME)
      console.log({
        pData_dwType: pData.dwType,
        union_mouse: pData.DUMMYUNIONNAME.mouse,
        union_keyboard: pData.DUMMYUNIONNAME.keyboard,
        union_hid: pData.DUMMYUNIONNAME.hid,
      })
    }

  })
})

