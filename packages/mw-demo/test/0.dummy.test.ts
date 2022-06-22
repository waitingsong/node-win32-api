import assert from 'assert/strict'
import { relative } from 'path'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {

  describe('should work', () => {
    it('always passed', () => {
      assert(true)
    })
  })

})

