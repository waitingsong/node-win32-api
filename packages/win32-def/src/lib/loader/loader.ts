import assert from 'node:assert'

import koffi from 'koffi'

import { LoadOptions, IKoffiLib, LibFuncs } from '../types.js'

import { bindMethodsFromFuncDefList, createStructFromFuncDefList, gen_api_opts, parse_settings } from './loader.helper.js'


const cacheLibMap = new Map<string, IKoffiLib>()

function getLibFromCache(dll: string): IKoffiLib | undefined {
  return cacheLibMap.get(dll)
}
function setLibToCache(dll: string, lib: IKoffiLib): void {
  cacheLibMap.set(dll, lib)
}

export function load<T extends object>(options: LoadOptions<T>): LibFuncs<T> {
  const { dll, dllFuncs, usedFuncNames, settings } = options

  // const libName = dll.endsWith('.drv')
  //   ? prepareDllFile(dll)
  //   : dll
  const libName = dll

  const config = parse_settings(settings)
  const funcDefList = gen_api_opts<T>(dllFuncs, usedFuncNames)

  assert(dllFuncs)
  const inst = { } as LibFuncs<T>

  let lib = getLibFromCache(libName)
  if (! lib) {
    lib = koffi.load(libName)
    Object.defineProperty(inst, 'unload', {
      enumerable: false,
      value: () => {
        lib?.unload()
        cacheLibMap.delete(libName)
      },
    })
    setLibToCache(libName, lib)
  }

  if (config.autoCreateStruct) {
    createStructFromFuncDefList(funcDefList)
  }

  bindMethodsFromFuncDefList({
    lib,
    inst,
    config: config,
    funcDefList,
  })

  return inst
}

