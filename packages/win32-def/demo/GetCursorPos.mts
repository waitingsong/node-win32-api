#!/usr/bin/env tsx
// link: https://koffi.dev/pointers#pointer-types
import assert from 'node:assert/strict'

import ffi from 'koffi'
import { POINT_Factory } from 'win32-def/struct'


console.info('Running GetCursorPos()')

const user32 = ffi.load('user32.dll')

const { payload: pos, pointer } = POINT_Factory()

const func = user32.func('GetCursorPos', 'int', [`_Out_ ${pointer}`])
// const func = user32.func(`int __stdcall GetCursorPos(_Out_ ${comb.pointer}pos)`)

const res = func(pos) as number
console.info({ res, pos })
assert(pos.x >= 0 && pos.y >= 0)

