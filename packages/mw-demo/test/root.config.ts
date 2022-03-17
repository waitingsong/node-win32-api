import { IncomingHttpHeaders } from 'http'

import supertest, { SuperTest } from 'supertest'

import { config } from './test.config'

import { Application } from '~/interface'
import { Config, MiddlewareConfig } from '~/lib/types'


export type TestResponse = supertest.Response
export interface TestRespBody {
  config: Config
  mwConfig: MiddlewareConfig
  cookies: unknown
  header: IncomingHttpHeaders
  url: string
}

export interface TestConfig {
  config: Config
  app: Application
  httpRequest: SuperTest<supertest.Test>
  host: string
}
export const testConfig = {
  config,
  host: '',
} as TestConfig

