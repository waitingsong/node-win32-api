import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { load } from '##/index.js'
import type { LoadOptions } from '##/index.js'

import { defKernel32 } from './api.helper.js'
import type { Kernel32Fns } from './api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Kernel32Fns> = {
    dll: 'kernel32.dll',
    dllFuncs: defKernel32,
  }

  describe('load()', () => {
    it('GetTickCount', async () => {
      const lib = load<Kernel32Fns>(options)

      const res = lib.GetTickCount()
      assert(res > 0)

      // test only, not necessary under windows
      lib.unload()
    })

  })
})

