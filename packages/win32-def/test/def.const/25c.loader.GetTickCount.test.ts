import assert from 'node:assert'

import { fileShortPath, isWin32 } from '@waiting/shared-core'

import { LoadOptions, load } from '##/index.js'

import { type Kernel32Fns, defKernel32 } from './api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Kernel32Fns> = {
    dll: 'kernel32.dll',
    dllFuncs: defKernel32,
  }

  describe('load()', () => {
    it('GetTickCount', async () => {
      if (! isWin32) { return }
      const lib = load<Kernel32Fns>(options)

      const res = lib.GetTickCount()
      assert(res > 0)

      // test only, not necessary under windows
      lib.unload()
    })

  })
})

