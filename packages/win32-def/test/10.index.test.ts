import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Def } from '##/index.js'
import * as S from '##/index.struct.js'
import * as T from '##/index.types.js'


void S.DOC_INFO_1_Factory // for test coverage
void T.CallingConvention

describe(fileShortPath(import.meta.url), () => {

  describe('should index work', () => {
    it('Def', () => {
      assert(Def)
      assert(Object.keys(Def).length > 0)
      assert(false, 'debug')
    })
  })

})

