import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'

import { fileShortPath } from '@waiting/shared-core'
import ref from 'ref-napi'
import { sleep } from 'zx'

import * as CS from '../../src/index.consts.js'
import { user32FindWindowEx } from '../../src/index.fun.js'
import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import { calcLpszNotepad } from '../config.unittest.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should work', () => {
    it('normal', async () => {
      const child = spawn('notepad.exe')
      await sleep(1000)

      const hWnd = await user32FindWindowEx(0, 0, calcLpszNotepad, null)
      assert(hWnd)
      assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0, 'found no calc window')

      child.kill()
    })
  })
})


