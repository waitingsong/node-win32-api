import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { DTypes } from '../../src/index.js'
import { settingsDefault } from '../../src/lib/config.js'
import { parse_windef } from '../../src/lib/helper.js'
import { macroMap } from '../../src/lib/marcomap.js'
import * as WD from '../../src/lib/windef.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'parse_windef()'

  // at lastest
  it(`Should ${fnName} process windef correctly)`, () => {
    const windata = parse_windef(WD, macroMap, { ...settingsDefault })
    const lenData = Object.keys(windata).length
    const lenRet = Object.keys(DTypes).length

    if (lenData !== lenRet) {
      const onlyInData: Set<string> = new Set()
      const onlyInIndex: Set<string> = new Set()

      for (const key of Object.keys(windata)) {
        if (typeof DTypes[key] === 'undefined') {
          onlyInData.add(key)
        }
      }
      for (const key of Object.keys(DTypes)) {
        if (typeof windata[key] === 'undefined') {
          onlyInIndex.add(key)
        }
      }

      console.info(onlyInData, onlyInIndex)
      assert(false, `lenData:${lenData}, lenDef:${lenRet} not equal `)
    }
  })

})

