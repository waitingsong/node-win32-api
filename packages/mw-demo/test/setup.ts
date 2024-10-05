// https://mochajs.org/#global-fixtures
// https://mochajs.org/#root-hook-plugins
import assert from 'node:assert'

import { close, createApp, createHttpRequest } from '@midwayjs/mock'
import { ValidateService } from '@midwayjs/validate'
import type { Application } from '@mwcp/share'
import type { Suite } from 'mocha'

import { type TestConfig, testConfig } from './root.config.js'


let app: Application

export async function mochaGlobalSetup(this: Suite) {
  app = await createAppInstance()
  await updateConfig(app, testConfig)
  await updateConfig2(app, testConfig)
}

export async function mochaGlobalTeardown(this: Suite) {
  await clean(app, testConfig)
  await close(app)
}


/**
 * Update testConfig in place
 */
async function createAppInstance(): Promise<Application> {
  try {
    app = await createApp(testConfig.testAppDir) as Application
  }
  catch (ex) {
    console.error('createApp error:', ex)
    throw ex
  }

  assert(app, 'app not exists')
  // const globalConfig = {
  //   keys: Math.random().toString(),
  // }
  // app.addConfigObject(globalConfig)

  const middlewares = app.getMiddleware().getNames()
  console.info({ middlewares })

  return app
  // https://midwayjs.org/docs/testing
}

async function updateConfig(mockApp: Application, config: TestConfig): Promise<void> {
  config.app = mockApp
  config.httpRequest = createHttpRequest(mockApp)

  assert(config.httpRequest, 'httpRequest not exists')
  const { url } = config.httpRequest.get('/')
  config.host = url

  config.container = mockApp.getApplicationContext()
  config.validateService = await config.container.getAsync(ValidateService)
  // const svc = await testConfig.container.getAsync(TaskQueueService)
}

async function updateConfig2(mockApp: Application, config: TestConfig): Promise<void> {
  void mockApp
  void config
}

async function clean(mockApp: Application, config: TestConfig): Promise<void> {
  void mockApp
  void config
}
