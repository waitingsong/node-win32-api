import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { settingsDefault } from '../src/lib/config.js'
import { parse_windef } from '../src/lib/helper.js'
import { macroMap } from '../src/lib/marcomap.js'
import * as WD from '../src/lib/windef.js'


describe(fileShortPath(import.meta.url), () => {
  const typesUnicode = new Set([
    'LPCTSTR', 'LPTSTR', 'PTBYTE', 'PTCHAR',
    'PTSTR', 'TBYTE', 'TCHAR',
  ])

  unicode(true, typesUnicode)
  unicode(false, typesUnicode)
})

function unicode(_UNICODE: boolean, typesUnicode: Set<string>) {
  const W = parse_windef(WD, macroMap, { ...settingsDefault, _UNICODE })

  for (const vv of typesUnicode) {
    const param = W[vv]
    assert(param)

    it(`Should macro ${vv}: value mathes setting of ANSI/UNICODE`, () => {
      if (_UNICODE) {
        const cond: boolean = !! param && typeof param === 'string'
          && param.indexOf('16') > 2
          && param.indexOf('8') === -1

        assert(cond, `${vv}: ${param} at UNICODE`)
      }
      else {
        // PTSTR == 'char*' under ia32
        const cond: boolean = !! param && typeof param === 'string'
          && (param.indexOf('8') > 2 || param === 'char*')
          && param.indexOf('16') === -1

        assert(cond, `${vv}: ${param} at ANSI`)
      }
    })
  }
}

