import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { DStructExt } from '../../src/index.js'
import { user32, Struct } from '../helper.js'



describe(fileShortPath(import.meta.url), () => {
  it('EnumDisplayDevicesW()', () => {
    const dd: M.DISPLAY_DEVICEW_Struct = new Struct(DStructExt.DISPLAY_DEVICEW)() as M.DISPLAY_DEVICEW_Struct
    dd.cb = dd.ref().byteLength

    const ret = user32.EnumDisplayDevicesW(ref.NULL, 0, dd.ref(), 0)
    assert(ret)
    const { DeviceName, DeviceString, DeviceID, DeviceKey } = dd
    console.log({
      DeviceName,
      DeviceString,
      DeviceID,
      DeviceKey,
    })
    assert(DeviceName.replace(/\0+$/u, '').includes('\\\\.\\DISPLAY1'))
    assert(DeviceString.replace(/\0/ug, '').length > 0)
  })

})

