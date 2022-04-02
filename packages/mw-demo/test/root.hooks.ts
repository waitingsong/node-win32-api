import 'tsconfig-paths/register'
import assert from 'assert/strict'
import { join } from 'path'

import * as WEB from '@midwayjs/koa'
import { createApp, close, createHttpRequest } from '@midwayjs/mock'

import { config, mwConfig } from './config.unittest'
import { testConfig } from './root.config'

import { ConfigKey } from '~/index'
import { Application } from '~/interface'


/**
 * @see https://mochajs.org/#root-hook-plugins
 * beforeAll:
 *  - In serial mode(Mocha’s default ), before all tests begin, once only
 *  - In parallel mode, run before all tests begin, for each file
 * beforeEach:
 *  - In both modes, run before each test
 */
export const mochaHooks = async () => {
  // avoid run multi times
  if (! process.env.mochaRootHookFlag) {
    process.env.mochaRootHookFlag = 'true'
  }

  return {
    beforeAll: async () => {
      const globalConfig = {
        keys: Math.random().toString(),
        [ConfigKey.config]: config,
        [ConfigKey.middlewareConfig]: mwConfig,
      }
      const opts = {
        imports: [WEB],
        globalConfig,
      }
      const app = await createApp(join(__dirname, 'fixtures', 'base-app'), opts) as Application
      app.addConfigObject(globalConfig)
      testConfig.app = app
      testConfig.httpRequest = createHttpRequest(app)
      const { url } = testConfig.httpRequest.get('/')
      testConfig.host = url

      const names = app.getMiddleware().getNames()
      assert(names.includes(ConfigKey.middlewareName) === mwConfig.enableMiddleware)

      // https://midwayjs.org/docs/testing
    },

    beforeEach: async () => {
      return
    },

    afterEach: async () => {
      const { app } = testConfig
      app.addConfigObject({
        [ConfigKey.config]: config,
        [ConfigKey.middlewareConfig]: mwConfig,
      })
    },

    afterAll: async () => {
      if (testConfig.app) {
        await close(testConfig.app)
      }
    },
  }

}

