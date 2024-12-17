import assert from 'node:assert'

import type { DllFuncsType } from '##/lib/ffi.types.js'
import type { FLib, LoadOptions } from '##/lib/types.js'

import { processDefList } from './def.helper.js'
import { LoaderCache } from './loader.cache.js'
import {
  bindFLibExtMethods,
  bindMethodsFromFuncDefList,
  createStructFromFuncDefList,
  loadIKoffiLib,
  parse_settings,
  saveFnMultipleChoiceMapperList,
} from './loader.helper.js'


export function load<T extends object>(options: LoadOptions<T>): FLib<T> {
  const { dll, dllFuncs, usedFuncNames } = options

  // const libName = dll.endsWith('.drv') ? prepareDllFile(dll) : dll
  const libName = dll
  const opts = parse_settings(options)
  const funcDefListMap = processDefList(dllFuncs, usedFuncNames)

  assert(dllFuncs)
  const inst = {} as FLib<DllFuncsType>

  let lib = LoaderCache.getLibByName(libName)
  if (! lib) {
    lib = loadIKoffiLib(libName)
  }

  if (options.multipleChoiceMapperList) {
    saveFnMultipleChoiceMapperList(lib, options.multipleChoiceMapperList)
  }

  if (opts.autoCreateStruct) {
    createStructFromFuncDefList(funcDefListMap)
  }

  bindMethodsFromFuncDefList({
    lib,
    inst,
    loadOptions: opts,
    funcDefList: funcDefListMap,
    multipleChoiceMapperList: opts.multipleChoiceMapperList,
    forceRegister: !! opts.forceRegister,
  })

  bindFLibExtMethods(libName, lib, inst)

  return inst as FLib<T>
}
