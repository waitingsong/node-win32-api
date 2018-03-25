/// <reference types="mocha" />

import * as assert from 'power-assert'

import { dataTypes } from '../src/index'
import {
  settingsDefault,
  windefSkipKeys,
  _UNICODE_HOLDER,
  _WIN64_HOLDER,
} from '../src/lib/config'
import * as H from '../src/lib/helper'
import * as WD from '../src/lib/windef'
import {
  basename,
  logger,
} from '../src/shared/index'


const filename = basename(__filename)


describe(filename + ' :parse_windef()', () => {
  const fnName = 'parse_windef()'

  // at lastest
  it(`Should ${fnName} process windef correctly)`, () => {
    const windata = H.parse_windef(WD, {...settingsDefault})
    const lenData = Object.keys(windata).length
    const lenRet = Object.keys(dataTypes).length

    if (lenData !== lenRet) {
      const onlyInData = <Set<string>> new Set()
      const onlyInIndex = <Set<string>> new Set()

      for (const key of Object.keys(windata)) {
        if (typeof dataTypes[key] === 'undefined') {
          onlyInData.add(key)
        }
      }
      for (const key of Object.keys(dataTypes)) {
        if (typeof windata[key] === 'undefined' && ! windefSkipKeys.has(key)) {
          onlyInIndex.add(key)
        }
      }

      logger(onlyInData, onlyInIndex)
      assert(false, `lenData:${lenData}, lenDef:${lenRet} not equal `)
    }

  })

})

