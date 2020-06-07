/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/// <reference types="node" />
/// <reference types="mocha" />

import * as fs from 'fs'
import { basename, normalize } from 'path'

import { join } from '@waiting/shared-core'
import * as assert from 'power-assert'
import { Config, FModel as FM } from 'win32-def'

import * as Win from '../src/index'


const filename = basename(__filename)
const dllDir = normalize(join(__dirname, '/../src/lib/'))
const dlls: string[] = []

for (const key of fs.readdirSync(dllDir)) {
  const stat = fs.statSync(normalize(dllDir + key))
  if (stat.isDirectory()) {
    dlls.push(key)
  }
}

describe(filename, () => {
  for (const dll of dlls) {
    const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase() // User32, Kernel32, ...
    const module: any = Win[apiName]

    describe(apiName, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (module && module.apiDef) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const apiDef = module.apiDef as FM.DllFuncs

        it('Should FnName of definition be string', () => {
          for (const x in apiDef) { // tslint:disable-line
            assert(typeof x === 'string')
          }
        })

        it('Should FnParams of definition be array', () => {
          for (const x in apiDef) { // tslint:disable-line
            const p = apiDef[x]
            assert(typeof p === 'object' && Array.isArray(p), `${x}()`)
          }
        })

        it('Should FnRetType of definition be string and not epmty or array', () => {
          for (const x in apiDef) { // tslint:disable-line
            test_param_return_type(apiDef[x][0], x)
          }
        })

        it('Should FnRetType of definition exists in conf.windefSet', () => {
          for (const x in apiDef) { // tslint:disable-line
            const p = apiDef[x][0]
            const st = {
              _UNICODE: true,
              _WIN64: false,
            }
            // const _WIN64 = true
            // let param: GT.FnRetType

            for (const k of Object.keys(st)) {
              if (st[k]) {
                assert(
                  Config.windefSet.has(p),
                  `${x}() value: "${p}" ${st._WIN64 ? 'x64' : 'ia32'},
                ${st._UNICODE ? 'UNICODE' : 'ANSI'}`,
                )
              }
            }
            for (const k of Object.keys(st)) {
              if (! st[k]) {
                assert(
                  Config.windefSet.has(p),
                  `${x}() value: "${p}" ${st._WIN64 ? 'x64' : 'ia32'},
                ${st._UNICODE ? 'UNICODE' : 'ANSI'}`,
                )
              }
            }
          }
        })

        it('Should FnCallParams of definition be array', () => {
          for (const x in apiDef) { // tslint:disable-line
            const p = apiDef[x]
            assert(typeof p[1] === 'object' && Array.isArray(p[1]), `${x}()`)
          }
        })

        it('Should item of FnCallParams of definition exists in conf.windefSet and valid', () => {
          if (Config.windefSet && Config.windefSet.size) {
            for (const x in apiDef) { // tslint:disable-line
              const arr = apiDef[x][1]
              const len = arr.length

              if (len) {
                for (let i = 0; i < len; i++) {
                  const param = arr[i]

                  if (Array.isArray(param)) {
                    assert(false, 'param should be string, but array')
                  }
                  else {
                    test_call_param(param, x, i)
                  }
                }
              }
            }
          }
        })

      }
      else {
        assert(false, 'module or module.apiDef invalie')
      }

    })

  } // loop END
})


describe(filename, () => {
  for (const dll of dlls) {
    const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase() // User32, Kernel32, ...
    const module: any = Win[apiName]

    describe(apiName, () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (module && module.apiDef) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const api: FM.DllFuncs = module.load()

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


function test_param_return_type(param: FM.FnParam, x: string): void {
  if (typeof param === 'string') {
    assert(param, `${x}() string value of returnType (p[0]) is empty string`)
  }
  else {
    assert(false, `${x}() string value of returnType (p[0]) is NEITHER string NOR array`)
  }
}

function test_call_param(param: FM.FnParam, x: string, i: number): void {
  if (typeof param === 'string') {
    assert(Config.windefSet.has(param), `${x}() value: "${param} index: ${i}" is string but not exists in windefSet`)
  }
  else {
    assert(false, `${x}() string value of param (index: ${i}) is NEIGHER string NOR array`)
  }
}

