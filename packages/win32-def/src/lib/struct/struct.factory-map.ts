import type { StructFactory } from '##/lib/types.js'

import * as Structs from './struct.index.js'


export const structFactoryMap = new Map<string, StructFactory>()

if (! structFactoryMap.size) {
  Object.entries(Structs).forEach(([key, val]) => {
    if (typeof val === 'function') {
      structFactoryMap.set(key, val)
    }
  })
}

