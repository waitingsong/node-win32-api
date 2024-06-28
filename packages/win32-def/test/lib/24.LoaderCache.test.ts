import assert from 'node:assert'

import { fileShortPath, isWin32 } from '@waiting/shared-core'

import type { KoffiFunction } from '##/index.js'
import type { MultipleChoiceMapperList, MultipleChoiceMapper, MultipleChoiceMapperSet } from '##/index.types.js'
import { LoaderCache } from '##/lib/loader/loader.cache.js'
import { loadIKoffiLib } from '##/lib/loader/loader.helper.js'


describe(fileShortPath(import.meta.url), () => {
  const dll = 'acledit.dll'
  const fnName = 'ACLEDIT'
  const mapper: MultipleChoiceMapper = () => { return }

  const multipleChoiceMapperList: MultipleChoiceMapperList = new Map()
  const multipleChoiceMapperSet: MultipleChoiceMapperSet = new Set()
  multipleChoiceMapperList.set(fnName, multipleChoiceMapperSet)
  multipleChoiceMapperSet.add(mapper)

  describe('LoaderCache', () => {
    it('lib', async () => {
      if (! isWin32) { return }
      assert(! LoaderCache.getLibByName(dll))

      const ffiLIb = loadIKoffiLib(dll)
      assert(ffiLIb)
      assert(LoaderCache.getLibByName(dll) === ffiLIb)

      LoaderCache.removeLibByName(dll)
      assert(! LoaderCache.getLibByName(dll))
    })

    it('RegisteredFunc', async () => {
      if (! isWin32) { return }
      const ffiLIb = loadIKoffiLib(dll)
      assert(! LoaderCache.getRegisteredFuncMap(ffiLIb, fnName))

      const fn = (() => { return }) as KoffiFunction
      LoaderCache.setRegisteredFuncToCache(ffiLIb, fnName, fn, [])

      assert(LoaderCache.getRegisteredFunc(ffiLIb, fnName) === fn)

      LoaderCache.removeRegisteredFuncFromCache(ffiLIb, fnName)
      assert(! LoaderCache.getRegisteredFuncMap(ffiLIb, fnName))
    })

    it('eMultipleChoiceListMapper', async () => {
      if (! isWin32) { return }
      const ffiLIb = loadIKoffiLib(dll)
      assert(! LoaderCache.getMultipleChoiceListMapperSet(ffiLIb, fnName))

      LoaderCache.updateMultipleChoiceListMapper(ffiLIb, multipleChoiceMapperList)

      const res = LoaderCache.getMultipleChoiceListMapperSet(ffiLIb, fnName)
      assert(res === multipleChoiceMapperSet)

      LoaderCache.updateMultipleChoiceListMapper(ffiLIb, new Map())
      const res2 = LoaderCache.getMultipleChoiceListMapperSet(ffiLIb, fnName)
      assert(res2 === multipleChoiceMapperSet)

      LoaderCache.removeMultipleChoiceListMapper(ffiLIb, fnName)
      assert(! LoaderCache.getMultipleChoiceListMapperSet(ffiLIb, fnName))
    })
  })
})

