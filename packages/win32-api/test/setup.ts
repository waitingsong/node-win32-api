// https://mochajs.org/#global-fixtures
import assert from 'node:assert/strict'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'

import { isFileExists } from '@waiting/shared-core'

import { testConfig } from '#@/root.config.js'



export async function mochaGlobalSetup(): Promise<void> {
  void 0
}

export async function mochaGlobalTeardown(): Promise<void> {
  void 0

  const targetExists = await isFileExists(testConfig.startDocPrinterTargetFile)
  console.log('startDocPrinterTargetFile: ', testConfig.startDocPrinterTargetFile)
  assert(
    targetExists === true,
    `204.StartDocPrinter-EndDocPrinter.test.ts StartDocPrinter(): file not exists: ${testConfig.startDocPrinterTargetFile}`,
  )
  await rm(testConfig.startDocPrinterTargetFile, { force: true, recursive: false })
}

