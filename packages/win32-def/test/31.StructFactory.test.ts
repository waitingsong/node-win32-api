import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  StructCharOptions,
  StructFactory,
  StructInstanceBase,
  WCHAR_String,
  LPCTSTR,
  DOC_INFO_1,
} from '../src/index.js'
import * as DS from '../src/index.struct.js'
import * as DU from '../src/index.union.js'
import { DWORD, LPTSTR } from '../src/lib/common.def.js'
import * as ST from '../src/lib/struct/index.struct.types.js'

import { ast_PRINTER_INFO_1 } from './asserts/asserts.PRINTER_DEFAULTS.js'


describe(fileShortPath(import.meta.url), () => {


  describe('struct should work', () => {
    it('default', async () => {
      const name = 'foo'
      const docInfo = StructFactory<DOC_INFO_1>(DS.DOC_INFO_1)
      assert(typeof docInfo.pDocName === 'string')
      docInfo.pDocName = name
      docInfo.pDatatype = 'RAW'
    })

    it('useStringBuffer: true', async () => {
      const name = 'foo'
      const docInfo = StructFactory<DOC_INFO_1, true>(DS.DOC_INFO_1, { useStringBuffer: true })
      assert(typeof docInfo.pDocName === 'string')
      docInfo.pDocName = name
      docInfo.pDatatype = 'RAW'
    })

    it('useStringBuffer: false', async () => {
      const name = 'foo'
      const docInfo = StructFactory<DOC_INFO_1, false>(DS.DOC_INFO_1, { useStringBuffer: false })
      assert(typeof docInfo.pDocName === 'object')
      assert(Buffer.isBuffer(docInfo.pDocName))
      docInfo.pDocName = Buffer.from(name + '\0')
      docInfo.pDatatype = Buffer.from('RAW\0')
    })
  })


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
      const struct = StructFactory<ST.PRINTER_INFO_1, false>(DS.PRINTER_INFO_1, opts)
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

  })

  describe('struct should work type User', () => {
    it('default', () => {
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
      assert(typeof address === 'string', typeof address)
    })

    it('useStringBuffer: true', () => {
      interface User extends StructInstanceBase {
        name: WCHAR_String
        address: LPCTSTR
      }
      const user = {
        name: LPTSTR,
        address: LPTSTR,
      } as const

      const struct = StructFactory<User, true>(user)
      assert(struct)

      struct.name = 'foo'
      assert(struct.name === 'foo')

      struct.address = 'bar'
      const p1 = struct.address.toString()
      assert(p1 === 'bar', p1)
    })

    it('useStringBuffer: false will wrong get, set', () => {
      interface User extends StructInstanceBase {
        name: WCHAR_String
        address: LPCTSTR
      }
      const user = {
        name: LPTSTR,
        address: LPTSTR,
      } as const

      const struct = StructFactory<User, false>(user, { useStringBuffer: false })
      assert(struct)

      struct.address = Buffer.from('bar', 'ucs2')
      const p1 = struct.address.toString('ucs2')
      assert(p1 === 'b', p1)

      try {
        struct.name = 'foo' // actually Buffer
      }
      catch {
        return
      }
      assert(false, 'should throw Error but not')
    })
  })

})

