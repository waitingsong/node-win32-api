import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { Msg } from '##/lib/types.js'
import { apiBase, apiMethod } from '#@/api-test.js'
import { testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {

  const url = `${apiBase.root}${apiMethod.component}`

  it(`Should ${url} work`, async () => {
    const { app, httpRequest } = testConfig

    const resp = await httpRequest.get(url)
    assert(resp.ok, resp.text)

    const ret = resp.text
    assert(ret.includes(url), JSON.stringify(ret, null, 2))
  })

})

