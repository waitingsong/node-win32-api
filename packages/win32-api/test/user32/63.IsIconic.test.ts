import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { fileShortPath} from '@waiting/shared-core';
import { sleep } from 'zx'
import { user32FindWindowEx } from '../../src/index.fun.js'
import { calcLpszWindow } from '../config.unittest.js'

import { user32, destroyWin } from '../helper.js'

describe(fileShortPath(import.meta.url), () => {
  it("IsIconic()", async () => {
    const child = spawn("calc.exe")
    await sleep(1500)

    const hWnd = await user32FindWindowEx(0, 0, null, calcLpszWindow)
    assert((typeof hWnd === 'string' && hWnd.length > 0) || hWnd > 0, 'invalid hWnd')

    assert(! await user32.IsIconic(hWnd))
    await user32.ShowWindow(hWnd, 2) // minimize
    assert(await user32.IsIconic(hWnd))

    await destroyWin(hWnd)
    child.kill()
  })
})
