import assert from 'node:assert'

import { testConfig } from '#@/root.config.js'


export const expectPrinterInfo = {
  name: testConfig.CI ? 'Microsoft XPS Document Writer' : 'Microsoft Print to PDF',
  description: testConfig.CI ? 'Microsoft XPS Document Writer,Microsoft XPS Document Writer v4,' : 'Microsoft Print to PDF',
  flags: testConfig.CI ? 8388608 : 8388608,
}

