/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="node" />
/// <reference types="mocha" />

import * as fs from 'fs'
import { basename, normalize } from 'path'

import { join } from '@waiting/shared-core'
import * as assert from 'power-assert'
import { FModel } from 'win32-def'

import * as Win from '../src/index'
import * as H from '../src/lib/helper'


const filename = basename(__filename)
const dllDir = normalize(join(__dirname, '/../src/lib/'))
const dlls: string[] = []

for (const key of fs.readdirSync(dllDir)) {
  const stat = fs.statSync(normalize(dllDir + key))
  if (stat.isDirectory()) {
    dlls.push(key)
  }
}


describe(filename + ' :gen_api_opts() all', () => {
  for (const dll of dlls) {
    const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase() // User32, Kernel32, ...
    const module: any = Win[apiName]

    if (module && module.apiDef) {
      const api: FModel.DllFuncs = module.apiDef
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

