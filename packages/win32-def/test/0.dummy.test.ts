import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('always passed', () => {
      assert(true)
    })
  })

})
