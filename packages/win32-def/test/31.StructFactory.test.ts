import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  StructCharOptions,
  StructFactory,
  StructInstanceBase,
  WCHAR_String,
  LPCTSTR,
} from '../src/index.js'
import * as DS from '../src/index.struct.js'
import * as DU from '../src/index.union.js'
import { DWORD, LPTSTR } from '../src/lib/common.def.js'
import * as ST from '../src/lib/struct/index.struct.types.js'

import { ast_PRINTER_INFO_1 } from './asserts/asserts.PRINTER_DEFAULTS.js'


describe(fileShortPath(import.meta.url), () => {
  describe('PRINTER_INFO_1 struct should work', () => {
    it('nomal', () => {
      const struct = StructFactory<ST.PRINTER_INFO_1>(DS.PRINTER_INFO_1)
      assert(struct)
      ast_PRINTER_INFO_1(struct)

      const { Flags, pDescription, pName, pComment } = struct
      assert(typeof Flags === 'number')
      assert(typeof pDescription === 'string')
      assert(typeof pName === 'string')
      assert(typeof pComment === 'string')

      assert(pName.length === 0)
      const rnd = 'foo'
      struct.pName = rnd
      assert(pName.length === 0)
      assert(struct.pName.length === 3)
      assert(struct.pName === rnd)
    })
  })

  describe('PRINTER_INFO_1 struct should work with options', () => {
    it('useStringBuffer: false', () => {
      const opts: StructCharOptions = {
        useStringBuffer: false,
      }
      const struct = StructFactory<ST.PRINTER_INFO_1>(DS.PRINTER_INFO_1, opts)
      assert(struct)

      const { Flags, pDescription, pName, pComment } = struct
      assert(typeof Flags === 'number')
      assert(typeof pDescription === 'object') // vsc type hint show 'string'
      assert(typeof pName === 'object') // vsc type hint show 'string'
      assert(typeof pComment === 'object') // vsc type hint show 'string'
    })

    it('maxCharLength', () => {
      const opts: StructCharOptions = {
        maxCharLength: 2,
      }
      const struct = StructFactory<ST.PRINTER_INFO_1>(DS.PRINTER_INFO_1, opts)
      assert(struct)
      ast_PRINTER_INFO_1(struct)

      const p1 = struct.pName
      assert(p1.length === 0)

      struct.pName = 'fo'
      assert(struct.pName.length === 2)

      const { pName } = struct
      assert(pName.length === 2)

      try {
        struct.pName = 'foo'
      }
      catch {
        return
      }
      assert(false, 'should throw Error but not')
    })

    it('useStringBuffer, invalid CharDefs', () => {
      const opts: StructCharOptions = {
        useStringBuffer: true,
        CharDefs: [DWORD],
      }
      const struct = StructFactory<ST.PRINTER_INFO_1>(DS.PRINTER_INFO_1, opts)
      assert(struct)

      const { Flags, pDescription, pName, pComment } = struct
      assert(typeof Flags === 'string', typeof Flags)
      assert(typeof pDescription === 'object', typeof pDescription)
      assert(typeof pName === 'object')
      assert(typeof pComment === 'object')
    })
  })

  describe('struct should work type _POINTER', () => {
    it('nomal', () => {
      interface User extends StructInstanceBase {
        name: WCHAR_String
        address: LPCTSTR
      }
      const user = {
        name: LPTSTR,
        address: LPTSTR,
      } as const

      const struct = StructFactory<User>(user)
      assert(struct)

      const { name, address } = struct
      assert(typeof name === 'string')
      assert(typeof address === 'string', typeof address) // hint show 'Buffer'
    })

    it('Buffer encoding only support ucs2', () => {
      interface User extends StructInstanceBase {
        name: WCHAR_String
        address: LPCTSTR
      }
      const user = {
        name: LPTSTR,
        address: LPTSTR,
      } as const

      const struct = StructFactory<User>(user)
      assert(struct)

      struct.name = 'foo'
      assert(struct.name === 'foo')

      struct.address = Buffer.from('bar', 'ucs2')
      const p1 = struct.address.toString('ucs2')
      assert(p1 === 'bar', p1)

      const p2 = 'bar1'
      struct.address = Buffer.from(p2, 'utf8')
      const p3 = struct.address.toString('utf8')
      assert(p3 !== p2, p3)

      const p4 = struct.address.toString('ucs2')
      assert(p4 !== p2, p4)
    })
  })

})

