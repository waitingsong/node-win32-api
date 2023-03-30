import assert from 'node:assert/strict'
import { relative } from 'node:path'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {

  describe('should work', () => {
    it('always passed', () => {
      assert(true)
    })
  })

})

