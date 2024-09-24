import assert from 'node:assert'

import type { FnDefArgs } from '##/lib/ffi.types.js'
import type { IKoffiLib, KoffiFunction, MultipleChoiceMapperList, MultipleChoiceMapperSet } from '##/lib/types.js'


type DllName = string
type FnName = string

export class LoaderCache {

  static readonly cacheLibMap = new Map<DllName, IKoffiLib>()
  static readonly regCacheMap = new WeakMap<IKoffiLib, Map<FnName, Map<FnDefArgs, KoffiFunction>>>()
  static readonly multipleChoiceMapperList = new WeakMap<IKoffiLib, MultipleChoiceMapperList>()

  /**
   * Get function by definition arguments of the function
   */
  static getFuncByDefArgs(lib: IKoffiLib, fnName: string, defArgs: FnDefArgs): KoffiFunction | undefined {
    assert(defArgs.length > 1, 'runtimeDefArgs.length must > 1')
    const map = LoaderCache.getRegisteredFuncMap(lib, fnName)
    return map?.get(defArgs)
  }

  /**
   * Get function definition arguments
   */
  static getFnDefArgs(lib: IKoffiLib, fnName: string): FnDefArgs[] {
    const cacheMap = LoaderCache.regCacheMap.get(lib)
    const map = cacheMap?.get(fnName)
    return map ? [...map.keys()] : []
  }

  // #region cacheLibMap

  static getLibByName(dllName: string): IKoffiLib | undefined {
    return LoaderCache.cacheLibMap.get(dllName)
  }

  static setLibByName(dllName: string, lib: IKoffiLib): void {
    LoaderCache.cacheLibMap.set(dllName, lib)
  }

  static removeLibByName(dllName: string): void {
    LoaderCache.cacheLibMap.delete(dllName)
  }

  // #region regCacheMap

  static getRegisteredFunc(lib: IKoffiLib, fnName: string): KoffiFunction | undefined {
    const cacheMap = LoaderCache.regCacheMap.get(lib)
    const map = cacheMap?.get(fnName)
    if (map?.size) {
      const arr = map.entries().next().value
      const ret = arr?.[1]
      return ret
    }
  }

  /**
   *
   * @note return Map<FnDefArgs, KoffiFunction> | undefined
   */
  static getRegisteredFuncMap(lib: IKoffiLib, fnName: string): Map<FnDefArgs, KoffiFunction> | undefined {
    const cacheMap = LoaderCache.regCacheMap.get(lib)
    return cacheMap?.get(fnName)
  }

  static setRegisteredFuncToCache(lib: IKoffiLib, name: string, fn: KoffiFunction, defArgs: FnDefArgs): void {
    let map1 = LoaderCache.regCacheMap.get(lib)
    if (! map1) {
      map1 = new Map<string, Map<FnDefArgs, KoffiFunction>>()
      LoaderCache.regCacheMap.set(lib, map1)
    }

    let map2 = map1.get(name)
    if (! map2) {
      map2 = new Map<FnDefArgs, KoffiFunction>()
      map1.set(name, map2)
    }
    map2.set([...defArgs], fn)
  }

  static removeRegisteredFuncFromCache(lib: IKoffiLib, name: string): void {
    const cacheMap = LoaderCache.regCacheMap.get(lib)
    cacheMap?.delete(name)
  }

  // #region multipleChoiceMapperList

  /**
   * Get multiple choice list mapper by function name, return Set
   *
   */
  static getMultipleChoiceListMapperSet(lib: IKoffiLib, fnName: string): MultipleChoiceMapperSet | undefined {
    return LoaderCache.multipleChoiceMapperList.get(lib)?.get(fnName)
  }

  static updateMultipleChoiceListMapper(lib: IKoffiLib, fnMapperList: MultipleChoiceMapperList): void {
    let map = LoaderCache.multipleChoiceMapperList.get(lib)
    if (! map) {
      map = new Map<string, MultipleChoiceMapperSet>()
      LoaderCache.multipleChoiceMapperList.set(lib, fnMapperList)
    }
    fnMapperList.forEach((fnMappers, fnName) => {
      const set = map.get(fnName)
      if (set) {
        fnMappers.forEach(fn => set.add(fn))
      }
      else {
        map.set(fnName, fnMappers)
      }
    })
  }

  static removeMultipleChoiceListMapper(lib: IKoffiLib, fnName: string): void {
    LoaderCache.multipleChoiceMapperList.get(lib)?.delete(fnName)
  }

}

