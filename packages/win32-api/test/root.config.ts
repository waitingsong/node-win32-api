import { homedir } from 'node:os'
import { join } from 'node:path'

import { genCurrentDirname } from '@waiting/shared-core'

import { isWinLocaleChinese } from './util.js'


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
  isWinChinese: boolean
  notepadTitle: string
  pDocName: string
  startDocPrinterTargetFile: string
}

const testAppDir = join(testDir, 'fixtures', 'base-app')
const isWinChinese = await isWinLocaleChinese()

const pDocNameRndStr = 'win32-api_test_' + Math.random().toString(36).slice(2)
const pDocNamePath = `${homedir()}/Documents/${pDocNameRndStr}.pdf`

export const testConfig = {
  baseDir,
  testDir,
  testAppDir,
  CI,
  TEST,
  isWinChinese,
  notepadTitle: isWinChinese ? '无标题 - 记事本' : 'Untitled - Notepad',
  pDocName: pDocNameRndStr,
  startDocPrinterTargetFile: pDocNamePath,
} as TestConfig

