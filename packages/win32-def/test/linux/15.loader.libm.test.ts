import assert from 'node:assert'

import { fileShortPath, isWin32 } from '@waiting/shared-core'

import { LoadOptions, load } from '##/index.js'

import { type Libm, DefLibm } from './api.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const dll = 'libm.so'
  const options: LoadOptions<Libm> = {
    dll,
    dllFuncs: DefLibm,
  }

  describe('load() under Linux', () => {
    it(dll, async () => {
      if (isWin32) { return }

      const lib = load<Libm>(options)
      const ret = lib.ceil(1.5)
      assert(ret === 2)
    })
  })
})

