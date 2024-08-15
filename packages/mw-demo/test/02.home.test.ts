import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { ConfigKey, Msg } from '##/lib/types.js'
import { apiBase, apiMethod } from '#@/api-test.js'
import { testConfig } from '#@/root.config.js'
import type { RespData, TestRespBody } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), () => {

  const helloPath = `${apiBase.prefix}/${apiMethod.hello}`

  it(`Should ${apiBase.root} work`, async () => {
    const { app, httpRequest } = testConfig

    const resp = await httpRequest.get(apiBase.root)
    assert(resp.ok, resp.text)

    const ret = resp.body as TestRespBody | RespData
    assert(typeof ret === 'object', JSON.stringify(ret, null, 2))

    if ('code' in ret && typeof ret.code === 'number') {
      assert(ret.code === 0)
      assert(typeof ret.data === 'object', JSON.stringify(ret, null, 2))

      const { url, header } = ret.data
      const { host } = header
      assert(url === '/', JSON.stringify(ret, null, 2))
      assert(host && testConfig.host.includes(host), JSON.stringify(ret, null, 2))
    }
    else {
      const { url, header } = ret as RespData
      const { host } = header
      assert(url === '/', JSON.stringify(ret, null, 2))
      assert(host && testConfig.host.includes(host), JSON.stringify(ret, null, 2))
    }
  })

  it(`Should ${helloPath} work`, async () => {
    const { app, httpRequest } = testConfig

    const resp = await httpRequest.get(helloPath)
    assert(resp.ok, resp.text)

    const ret = resp.text
    assert(ret.includes(Msg.hello), JSON.stringify(ret, null, 2))
  })

})

