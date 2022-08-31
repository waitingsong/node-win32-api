import assert from 'node:assert/strict'
import { relative } from 'node:path'

import { testConfig, TestRespBody } from '@/root.config'
import { ConfigKey, Msg } from '~/lib/types'


const filename = relative(process.cwd(), __filename).replace(/\\/ug, '/')

describe(filename, () => {

  const path = '/'
  const helloPath = `/${ConfigKey.namespace}/hello`

  it(`Should ${path} work`, async () => {
    const { httpRequest } = testConfig

    const resp = await httpRequest
      .get(path)
      .expect(200)

    const ret = resp.body as TestRespBody
    const { url, header } = ret
    const { host } = header
    assert(url === '/')
    assert(host && testConfig.host.includes(host))
  })

  it(`Should ${helloPath} work`, async () => {
    const { httpRequest } = testConfig

    const resp = await httpRequest
      .get(helloPath)
      .expect(200)

    const ret = resp.text as string
    assert(ret === Msg.hello)
  })

})

