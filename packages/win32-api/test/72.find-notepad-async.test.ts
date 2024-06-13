import { spawn } from 'child_process'
import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { sleep } from 'zx'

import { user32FindWindowEx } from '../src/index.fun.js'
import { ucsBufferToString, ucsBufferFrom } from '../src/index.js'
import * as UP from '../src/index.user32.js'

import { calcLpszClassNotepad, calcLpszNotepad } from './config.unittest.js'
import { assertsHwnd, destroyWin, user32, user32Sync } from './helper.js'



describe(fileShortPath(import.meta.url), () => {

  describe('Should FindWindowExW() work', () => {
    it('find window hWnd via await', async () => {
      const child = spawn('notepad.exe')

      console.log(new Date().toLocaleTimeString())
      await sleep(2000)
      console.log(new Date().toLocaleTimeString())

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assertsHwnd(hWnd)
      await destroyWin(hWnd)
      child.kill()
    })

    it.skip('find window hWnd via callback async', async () => {
      const child = spawn('notepad.exe')

      console.log(new Date().toLocaleTimeString())
      await sleep(2000)
      console.log(new Date().toLocaleTimeString())

      await new Promise<void>((done) => {
        user32Sync.FindWindowExW.async(0, 0, null, calcLpszClassNotepad, (err, hWnd) => {
          if (err) {
            assert(false, err.message)
          }

          assertsHwnd(hWnd)
          child.kill()
          done()
        })
      })
    })


    it('change window title', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)
      await findNSetWinTitleAsync()
      child.kill()
    })

    it('change window title with partial loading', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)
      await findNSetWinTitleAsyncPartial()
      child.kill()
    })

  })
})


async function findNSetWinTitleAsync(): Promise<void> {
  const title = 'Node-Notepad' + Math.random().toString()
  const len = title.length
  const size = len + 1
  const hWnd = await user32.FindWindowExW(0, 0, calcLpszClassNotepad, null)

  assertsHwnd(hWnd)
  const ret = await user32.SetWindowTextW(hWnd, ucsBufferFrom(title))
  assert(ret, 'SetWindowTextW() failed')

  const buf = Buffer.alloc(size * 2)
  await user32.GetWindowTextW(hWnd, buf, size)
  const str = buf.toString('ucs2').replace(/\0+$/u, '')
  assert(str === title.trim(), `title should be changed to "${title}", bug got "${str}"`)
}


async function findNSetWinTitleAsyncPartial(): Promise<void> {
  const u32 = UP.load(['FindWindowExW', 'SetWindowTextW'])

  const title = 'Node-Notepad' + Math.random().toString()
  const len = title.length
  const size = len + 1
  const hWnd = await u32.FindWindowExW(0, 0, calcLpszClassNotepad, null)

  assertsHwnd(hWnd)
  // Change title of the Calculator
  await u32.SetWindowTextW(hWnd, ucsBufferFrom(title))

  const buf = Buffer.alloc(size * 2)
  await u32.GetWindowTextW(hWnd, buf, size)
  const str = ucsBufferToString(buf)
  assert(str === title, `title should be changed to ${title}, bug got ${str}`)
}

