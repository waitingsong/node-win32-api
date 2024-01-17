import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { ConfigKey, Msg } from '##/lib/types.js'
import { RespData, TestRespBody, testConfig } from '#@/root.config.js'


describe(fileShortPath(import.meta.url), function() {

  const path = '/'
  const helloPath = `/_${ConfigKey.namespace}/hello`

  it(`Should ${path} work`, async () => {
    const { app, httpRequest } = testConfig

    const resp = await httpRequest
      .get(path)
      .expect(200)

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

    const resp = await httpRequest
      .get(helloPath)
      .expect(200)

    const ret = resp.text
    assert(ret.includes(Msg.hello), JSON.stringify(ret, null, 2))
  })

})

