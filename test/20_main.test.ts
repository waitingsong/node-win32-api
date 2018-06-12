/// <reference types="node" />
/// <reference types="mocha" />

import * as fs from 'fs'
import { basename, normalize } from 'path'
import * as assert from 'power-assert'

import * as Win from '../src/index'
import { windefSet } from '../src/lib/conf'
import * as GT from '../src/lib/types'

const filename = basename(__filename)
const dllDir = normalize(__dirname + '/../src/lib/')
const dlls = <string[]> []

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

    if (module && module.apiDef) {
      const apiDef = <GT.ApiDef> module.apiDef

      it(`Should ${apiName}: FnName of definition be string`, () => {
                for (let x in apiDef) {    // tslint:disable-line
                  assert(typeof x === 'string')
                }
      })

      it(`Should ${apiName}: FnParams of definition be array`, () => {
                for (let x in apiDef) {    // tslint:disable-line
                  const p = apiDef[x]
                  assert(typeof p === 'object' && Array.isArray(p), `${x}()`)
                }
      })

      it(`Should ${apiName}: FnRetType of definition be string and not epmty or array`, () => {
                for (let x in apiDef) {    // tslint:disable-line
                  test_param_return_type(apiDef[x][0], x)
                }
      })

      it(`Should ${apiName}: FnRetType of definition exists in conf.windefSet`, () => {
        for (let x in apiDef) {    // tslint:disable-line
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
                windefSet.has(p),
                `${x}() value: "${p}" ${st._WIN64 ? 'x64' : 'ia32'},
                ${st._UNICODE ? 'UNICODE' : 'ANSI'}`,
              )
            }
          }
          for (const k of Object.keys(st)) {
            if (!st[k]) {
              assert(
                windefSet.has(p),
                `${x}() value: "${p}" ${st._WIN64 ? 'x64' : 'ia32'},
                ${st._UNICODE ? 'UNICODE' : 'ANSI'}`,
              )
            }
          }
        }
      })

      it(`Should ${apiName}: FnCallParams of definition be array`, () => {
                for (let x in apiDef) {    // tslint:disable-line
                  const p = apiDef[x]
                  assert(typeof p[1] === 'object' && Array.isArray(p[1]), `${x}()`)
                }
      })

      it(`Should ${apiName}: item of FnCallParams of definition exists in conf.windefSet and valid`, () => {
        if (windefSet && windefSet.size) {
                    for (let x in apiDef) {    // tslint:disable-line
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

  }   // loop END
})


describe(filename, () => {
  for (const dll of dlls) {
    const apiName: string = dll.slice(0, 1).toUpperCase() + dll.slice(1).toLowerCase() // User32, Kernel32, ...
    const module: any = Win[apiName]

    if (module && module.apiDef) {
      try {
        const api: GT.ApiDef = module.load()

        for (const fn in api) {
          if (!{}.hasOwnProperty.call(api, fn)) {
            continue
          }
          it(`Should ${apiName}.${fn}() be typeof "function"`, () => {
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
  }
})


function test_param_return_type(param: GT.FFIParam, x: string): void {
  if (typeof param === 'string') {
    assert(param, `${x}() string value of returnType (p[0]) is empty string`)
  }
  else {
    assert(false, `${x}() string value of returnType (p[0]) is NEITHER string NOR array`)
  }
}

function test_call_param(param: GT.FFIParam, x: string, i: number): void {
  if (typeof param === 'string') {
    assert(windefSet.has(param), `${x}() value: "${param} index: ${i}" is string but not exists in windefSet`)
  }
  else {
    assert(false, `${x}() string value of param (index: ${i}) is NEIGHER string NOR array`)
  }
}


