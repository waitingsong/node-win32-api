import { IncomingHttpHeaders } from 'http'

import supertest, { SuperTest } from 'supertest'

import { config } from './config.unittest'

import { Application } from '~/interface'
import { Config, MiddlewareConfig } from '~/lib/types'


export type TestResponse = supertest.Response
export interface TestRespBody {
  header: IncomingHttpHeaders
  url: string
  config: Config
  mwConfig: MiddlewareConfig
  cookies: unknown
}

export interface TestConfig {
  app: Application
  config: Config
  host: string
  httpRequest: SuperTest<supertest.Test>
}
export const testConfig = {
  config,
  host: '',
} as TestConfig

