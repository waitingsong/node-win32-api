import assert from 'node:assert/strict'
import fs from 'node:fs'
import { normalize } from 'node:path'

import { join, fileShortPath, genCurrentDirname } from '@waiting/shared-core'
import { Config, FModel as FM } from 'win32-def'

import * as Win from '../src/index.js'


const __dirname = genCurrentDirname(import.meta.url)
const dllDir = normalize(join(__dirname, '/../src/lib/'))
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

    describe(apiName, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (module && module.apiDef) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const api = module.load() as FM.DllFuncs

          for (const fn in api) {
            if (! {}.hasOwnProperty.call(api, fn)) {
              continue
            }
            it(`Should ${fn}() be typeof "function"`, () => {
              assert(typeof api[fn] === 'function', `${fn}`)
            })
          }
        }
        catch (ex) {
          assert.throws(() => {
            throw ex
          }, /dll init failed/)
        }
      }
      else {
        assert(false, 'module or module.apiDef invalie')
      }
    })
  }
})

