import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { LoadOptions, load } from '##/index.js'
import { LPDISPLAY_DEVICEW, LPPOINT } from '##/index.struct.js'
import { DefWin32 } from '#@/def.class/api.helper.js'
import type { Win32 } from '#@/def.class/api.helper.js'


// Make sure this suit run as early as possible, for testing Struct not created case !

describe(fileShortPath(import.meta.url), () => {
  const options: LoadOptions<Win32> = {
    dll: 'user32.dll',
    dllFuncs: DefWin32,
  }

  describe('load() run first', () => {
    // run first
    it('autoCreateStruct=false', async () => {
      try {
        load<Win32>({
          ...options,
          autoCreateStruct: false,
        })
      }
      catch (ex) {
        assert(ex instanceof Error)
        assert(ex.message.includes(LPDISPLAY_DEVICEW) || ex.message.includes(LPPOINT), ex.message)
        return
      }
      assert(false, 'Should throw Error')
    })

  })
})

