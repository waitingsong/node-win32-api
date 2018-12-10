/// <reference types="mocha" />

import * as assert from 'power-assert'

import { DTypes } from '../src/index'
import {
  settingsDefault,
} from '../src/lib/config'
import * as H from '../src/lib/helper'
import { macroMap } from '../src/lib/marcomap'
import * as WD from '../src/lib/windef'
import {
  basename,
} from '../src/shared/index'


const filename = basename(__filename)


describe(filename + ' :parse_windef()', () => {
  const fnName = 'parse_windef()'

  // at lastest
  it(`Should ${fnName} process windef correctly)`, () => {
    const windata = H.parse_windef(WD, macroMap, { ...settingsDefault })
    const lenData = Object.keys(windata).length
    const lenRet = Object.keys(DTypes).length

    if (lenData !== lenRet) {
      const onlyInData = <Set<string>> new Set()
      const onlyInIndex = <Set<string>> new Set()

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

