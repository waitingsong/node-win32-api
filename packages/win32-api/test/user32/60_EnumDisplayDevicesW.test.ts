import { basename } from 'path'

import * as assert from 'power-assert'
import * as ref from 'ref-napi'
import {
  DModel as M,
  DStruct as DS,
  DTypes as W,
  FModel as FM,
} from 'win32-def'

import { user32, Struct } from '../helper'
import { DStructExt } from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {
  it('EnumDisplayDevicesW()', () => {
    const dd: M.DISPLAY_DEVICEW_Struct = new Struct(DStructExt.DISPLAY_DEVICEW)()
    const foo = dd.ref()
    dd.cb = dd.ref().byteLength

    const ret = user32.EnumDisplayDevicesW(ref.NULL, 0, dd.ref(), 0)
    console.log({
      DeviceName: dd.DeviceName,
      DeviceString: dd.DeviceString,
    })
    assert(dd.DeviceName.replace(/\0$/g, '').includes('\\\\.\\DISPLAY1'))
    assert(dd.DeviceString.replace(/\0/g, '').length > 0)

  })

})

