import { basename } from 'path'

import * as assert from 'power-assert'

import { Constants } from '../src/index'


const filename = basename(__filename)

describe.only(filename, () => {
  describe('Should Constants exported correctly', () => {
    it('Constants.MN_GETHMENU', () => {
      assert(Constants.MN_GETHMENU === 481)
    })

    it('Constants.WM_QUIT', () => {
      assert(Constants.WM_QUIT === 18)
    })

    it('Constants.WM_COPYDATA', () => {
      assert(Constants.WM_COPYDATA === 74)
    })
  })

})

