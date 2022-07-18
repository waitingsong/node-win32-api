import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

// import * as CS from '../../src/index.consts.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { calcLpszClassNotepad } from '../config.unittest.js'
import { user32, destroyWin } from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe.only('Should FlashWindow() work', () => {
    it.only('true', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32.FindWindowExW(0, 0, calcLpszClassNotepad, null)
      assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0)

      const point = StructFactory<M.POINT>(DS.POINT)
      const ret = await user32.GetCaretPos(point.ref())
      assert(ret > 0)
      console.log({ x: point.x, y: point.y })

      // await sleep(1000)
      await destroyWin(hWnd)
      child.kill()
    })
  })
})

