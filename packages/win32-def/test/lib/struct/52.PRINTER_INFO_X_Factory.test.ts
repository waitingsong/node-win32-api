import assert from 'node:assert'

import { fileShortPath } from '@waiting/shared-core'

import { PRINTER_INFO_X_Factory } from '##/index.struct.js'


describe(fileShortPath(import.meta.url), () => {

  describe('PRINTER_INFO_X_Factory()', () => {
    it('level 1', async () => {
      const { size } = PRINTER_INFO_X_Factory(1)
      assert(size === 32)
    })
    it('level 4', async () => {
      const { size } = PRINTER_INFO_X_Factory(4)
      assert(size === 24)
    })
    it('level 5', async () => {
      const { size } = PRINTER_INFO_X_Factory(5)
      assert(size === 32)
    })
    it('level 8', async () => {
      const { size } = PRINTER_INFO_X_Factory(8)
      assert(size === 220)
    })
    it('level 9', async () => {
      const { size } = PRINTER_INFO_X_Factory(9)
      assert(size === 220)
    })
  })
})

