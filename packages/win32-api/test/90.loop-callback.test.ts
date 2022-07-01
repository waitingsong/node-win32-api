import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { sleep } from 'zx'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
} from '../src/index.js'

import {
  changeTitle,
  createWindow,
  createWndProc,
  destroyWin,
} from './helper.js'


// skip due to timout
// Note: may crash
describe.skip(fileShortPath(import.meta.url), () => {

  it('Should WndProc works at more loops', async () => {
    const loops = 8
    const titlePrefix = `win32-api-${Math.random().toString()}-`
    const wndProc: M.WNDPROC = createWndProc()

    const hWnd = await createWindow(wndProc)
    await sleep(3000)
    assert(hWnd)
    const start = new Date().getTime()

    for (let i = 0; i < loops; i += 1) {
      assert(i + 1 <= loops, `index(${i}) exceed loops(${loops})`)
      const newTitle = titlePrefix + i.toString()
      const title2 = await changeTitle(hWnd, newTitle)
      assert(title2 === newTitle, `title should be changed to "${newTitle}", bug got "${title2}"`)
      await sleep(300)
    }
    const end = new Date().getTime()
    const delta = end - start
    console.info(`elp ${delta}ms at ${loops} loops`)
    typeof wndProc // avoid gc

    await destroyWin(hWnd)
  })
})

