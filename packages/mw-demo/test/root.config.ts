import { IncomingHttpHeaders } from 'node:http'

import supertest, { SuperTest } from 'supertest'

import { config } from '@/config.unittest'
import { Application } from '~/interface'
import {
  Config,
  MiddlewareConfig,
} from '~/lib/types'


const CI = !! process.env.CI
export type TestResponse = supertest.Response
export interface TestRespBody {
  header: IncomingHttpHeaders
  url: string
  config: Config
  mwConfig: MiddlewareConfig
  cookies: unknown
}

export interface TestConfig {
  CI: boolean
  app: Application
  config: Config
  host: string
  httpRequest: SuperTest<supertest.Test>
}
export const testConfig = {
  CI,
  config,
  host: '',
} as TestConfig

