import assert from 'node:assert/strict'
import fs from 'node:fs'
import { join, normalize } from 'node:path'

import { fileShortPath, genCurrentDirname } from '@waiting/shared-core'

import {
  DModel as M,
  DTypes as W,
  DStruct as DS,
} from '##/index.js'
import * as Win from '##/index.js'


const __dirname = genCurrentDirname(import.meta.url)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const dllDir = normalize(join(__dirname, '/../src/lib/'))
const dlls: string[] = []

for (const key of fs.readdirSync(dllDir)) {
  const dll = normalize(dllDir + key)
  const stat = fs.statSync(dll)
  if (stat.isDirectory()) {
    dlls.push(key)
  }
}

describe(fileShortPath(import.meta.url), () => {

  for (const dll of dlls) {
    const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase() // User32, Kernel32, ...
    console.log({ apiName })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const module = Win[apiName]
    assert(module, `${apiName} is not found`)

    describe(apiName, () => {

      it('normal', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (module?.apiDef) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const api = module.load() as M.DllFuncs

          for (const fn in api) {
            if (! {}.hasOwnProperty.call(api, fn)) {
              continue
            }
            it(`Should ${fn}() be typeof "function"`, () => {
              assert(typeof api[fn] === 'function', `${fn}`)
            })
          }
        }
        else {
          assert(false, 'module or module.apiDef invalie')
        }
      })
    })
  }
})

