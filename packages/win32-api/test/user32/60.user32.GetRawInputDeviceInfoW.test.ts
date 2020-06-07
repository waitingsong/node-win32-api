/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { basename } from 'path'

import * as assert from 'power-assert'
import {
  Config,
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { DStructExt as DSX } from '../../src/index'
import { user32, Struct, Union } from '../helper'


const filename = basename(__filename)


describe(filename, () => {
  it('Should GetRawInputDeviceInfoW() calling passed', () => {
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

    const delta = Config._WIN64 ? 8 : 4
    const readFn = Config._WIN64 ? 'readBigUInt64LE' : 'readUInt32LE'

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

      const nameLen = user32.GetRawInputDeviceInfoW(
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

      const pData: M.RID_DEVICE_INFO_Struct = new Struct(DSX.RID_DEVICE_INFO)()
      pData.cbSize = pData.ref().byteLength

      const infoLen = user32.GetRawInputDeviceInfoW(
        hDevice.toString(),
        0x2000000b,
        pData.ref(),
        pcbSize,
      )
      console.log({
        infoLen,
        pcbSize,
        pData_dwType: pData.dwType,
        union_mouse: pData.DUMMYUNIONNAME.mouse,
        union_keyboard: pData.DUMMYUNIONNAME.keyboard,
        union_hid: pData.DUMMYUNIONNAME.hid,
      })
    }

  })
})

