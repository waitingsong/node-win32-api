import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { useComponents } from '##/imports.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should work', () => {
    it('useComponents ', () => {
      assert(Array.isArray(useComponents))
    })

    it('testAppdir eq testConfig.testAppDir', () => {
      const { app, httpRequest } = testConfig
      assert(app)

      const appDir = app.getAppDir()
      assert(appDir)
      assert(appDir === testConfig.testAppDir)
    })
  })

})

