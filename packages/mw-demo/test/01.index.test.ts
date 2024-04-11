import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { useComponents } from '##/imports.js'
import * as Foo from '##/index.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('index', () => {
      assert(Foo)
    })

    it('useComponents', () => {
      assert(Array.isArray(useComponents))
    })

    it('testAppDir eq testConfig.testAppDir', () => {
      const { app } = testConfig
      assert(app)

      const appDir = app.getAppDir()
      assert(appDir)
      assert(appDir === testConfig.testAppDir)
    })
  })

})

