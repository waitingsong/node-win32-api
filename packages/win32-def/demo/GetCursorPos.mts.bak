#!/usr/bin/env tsx
/* eslint-disable import/no-extraneous-dependencies */
// link: https://koffi.dev/pointers#pointer-types
import assert from 'node:assert/strict'

import ffi from 'koffi'
import { registerFunction } from 'win32-api'
import { POINT_Factory } from 'win32-def/struct'
import type { POINT_Type } from 'win32-def/struct'


console.info('GetCursorPos()')

const user32 = ffi.load('user32.dll')

const comb = POINT_Factory()
const pos = { } as POINT_Type

try {
  // const func = user32.func(`int __stdcall GetCursorPos(_Out_ ${comb.pointer}pos)`)
  // const func = user32.func('__stdcall', 'GetCursorPos', 'int', [`_Out_ ${comb.pointer}`])
  const func = registerFunction({
    lib: user32,
    name: 'GetCursorPos',
    params: ['int', [`_Out_ ${comb.pointer}`]],
  })
  console.info(func.info)

  const res = func(pos) as number
  console.info({ res, pos })
  assert(pos.x > 0 && pos.y > 0)
}
finally {
  user32.unload()
}
