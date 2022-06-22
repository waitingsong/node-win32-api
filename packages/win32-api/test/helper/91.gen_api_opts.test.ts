import assert from 'node:assert/strict'
import fs from 'node:fs'
import { normalize } from 'node:path'

import { join, fileShortPath, genCurrentDirname } from '@waiting/shared-core'
import { FModel } from 'win32-def'

import * as Win from '../../src/index.js'
import * as H from '../../src/lib/helper.js'


const __dirname = genCurrentDirname(import.meta.url)
const dllDir = normalize(join(__dirname, '../../src/lib/'))
const dlls: string[] = []

for (const key of fs.readdirSync(dllDir)) {
  const stat = fs.statSync(normalize(dllDir + key))
  if (stat.isDirectory()) {
    dlls.push(key)
  }
}

describe(fileShortPath(import.meta.url), () => {
  for (const dll of dlls) {
    const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase() // User32, Kernel32, ...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const module = Win[apiName]
    assert(module)

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (module && module.apiDef) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const api = module.apiDef as FModel.DllFuncs
      assert(api)
      let n = 0

      for (const fn in api) {
        if (! {}.hasOwnProperty.call(api, fn)) {
          continue
        }
        n += 1
      }

      it(`Should ${apiName} number of fns equal to the number of fns return by gen_api_opts`, () => {
        const fns: FModel.DllFuncs = H.gen_api_opts(api)
        const keysize = Object.keys(fns).length

        assert(typeof fns === 'object' && fns, 'fns return by gen_api_opts() not object')
        assert(keysize === n, `the items of fns ${keysize} not equal to the ${n} numbers of item of the Win.${apiName}`)
      })

    }
    else {
      assert(false, 'module or module.apiDef invalie')
    }

  }
})

