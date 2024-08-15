import { join } from 'node:path'

import { genCurrentDirname } from '@waiting/shared-core'


export const testDir = genCurrentDirname(import.meta.url)
export const baseDir = join(testDir, '..')

export const CI = !! process.env['CI'] // GithubAction
export const TEST = !! (CI
  || process.env['MIDWAY_SERVER_ENV'] === 'unittest'
  || process.env['MIDWAY_SERVER_ENV'] === 'local'
  || process.env['NODE_ENV'] === 'unittest'
  || process.env['NODE_ENV'] === 'local'
)

export interface TestConfig {
  baseDir: string
  testDir: string
  testAppDir: string
  CI: boolean
  TEST: boolean
}

const testAppDir = join(testDir, 'fixtures', 'base-app')
export const testConfig = {
  baseDir,
  testDir,
  testAppDir,
  CI,
  TEST,
} as TestConfig

