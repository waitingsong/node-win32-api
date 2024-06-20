import * as Structs from './struct/struct.index.js'
import { StructFactory } from './types.js'


export const structFactoryMap = new Map<string, StructFactory>()

if (! structFactoryMap.size) {
  Object.entries(Structs).forEach(([key, val]) => {
    if (typeof val === 'function') {
      structFactoryMap.set(key, val)
    }
  })
}

