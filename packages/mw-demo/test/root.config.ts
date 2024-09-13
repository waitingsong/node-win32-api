import type { IncomingHttpHeaders } from 'node:http'
import { join } from 'node:path'

import type { ValidateService } from '@midwayjs/validate'
import type { Application, IMidwayContainer, JsonResp } from '@mwcp/share'
import { genCurrentDirname } from '@waiting/shared-core'
import type { Response, SuperTest, Test } from 'supertest'


export const testDir = genCurrentDirname(import.meta.url)
export const baseDir = join(testDir, '..')

export const CI = !! process.env['CI'] // GithubAction
export const TEST = !! (CI
  || process.env['MIDWAY_SERVER_ENV'] === 'unittest'
  || process.env['MIDWAY_SERVER_ENV'] === 'local'
  || process.env['NODE_ENV'] === 'unittest'
  || process.env['NODE_ENV'] === 'local'
)

export type TestResponse = Response
export type TestRespBody = JsonResp<RespData>
export interface RespData {
  header: IncomingHttpHeaders
  url: string
  cookies: unknown
}

export interface TestConfig {
  baseDir: string
  testDir: string
  testAppDir: string
  CI: boolean
  TEST: boolean
  app: Application
  container: IMidwayContainer
  validateService: ValidateService
  host: string
  httpRequest: SuperTest<Test>
}

const testAppDir = join(testDir, 'fixtures', 'base-app')
export const testConfig = {
  baseDir,
  testDir,
  testAppDir,
  CI,
  TEST,
  host: '',
  httpRequest: {},
} as TestConfig


