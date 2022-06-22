import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'
import { FModel } from 'win32-def'

import * as Win from '../../src/index.js'
import * as H from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const apiName = 'Comctl32'
  const module: any = Win[apiName]
  const fn = 'InitCommonControlsEx'
  const fakeFn = fn + Math.random().toString()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (module && module.apiDef) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const api: FModel.DllFuncs = module.apiDef

    it(`Should ${apiName} gen_api_opts(["${fn}"]) correctly`, () => {
      const fns: FModel.DllFuncs = H.gen_api_opts(api, [fn])

      const keysize = Object.keys(fns).length

      assert(keysize === 1)
      assert(typeof fns[fn] === 'object' && fns[fn])
    })

    it(`Should ${apiName} gen_api_opts(["${fakeFn}"]) return none`, () => {
      const fns: FModel.DllFuncs = H.gen_api_opts(api, [fakeFn])
      const keysize = Object.keys(fns).length

      assert(keysize === 0)
      assert(typeof fns[fakeFn] === 'undefined')
    })
  }
  else {
    assert(false, 'module or module.apiDef invalie')
  }
})

