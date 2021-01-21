import {
  basename,
  join,
} from '@waiting/shared-core'
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should works', () => {
    it('always passed', () => {
      assert(true)
    })
  })

})

