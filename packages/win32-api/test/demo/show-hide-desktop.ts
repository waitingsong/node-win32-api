#!/usr/bin/env tsx
// Show/hide desktop with Win+D shortcut
// ref: https://koffi.dev/unions
import assert from 'node:assert/strict'

import { sleep } from '@waiting/shared-core'
import ffi from 'koffi'
import { INPUT_Factory } from 'win32-def/struct'

import { events } from './show-hide-desktop.helper.js'


console.info('Show/hide desktop with Win+D shortcut')

const input = INPUT_Factory()
const size = input.size
const user32 = ffi.load('user32.dll')

try {
  const SendInput = user32.func('__stdcall', 'SendInput', 'uint', ['uint', input.pointer, 'int'])

  const res = SendInput(events.length, events, size) as number
  assert(res > 0)
  console.info({ res })

  await sleep(2000)

  SendInput.async(events.length, events, size, (err: Error | undefined, res2: number) => {
    if (err) {
      console.error(err)
      return
    }
    assert(res2 > 0)
  }) as number
}
finally {
  user32.unload()
}


