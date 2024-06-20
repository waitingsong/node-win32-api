import { fileShortPath } from '@waiting/shared-core'

import { JOB_INFO_1_Factory, PJOB_INFO_1 } from '##/index.struct.js'
import { assertStructUnion } from '#@/helper.js'


const name = 'JOB_INFO_1'
const pointer = PJOB_INFO_1
const factory = JOB_INFO_1_Factory
const size = 24
const fn = `${name}_Factory`

describe(fileShortPath(import.meta.url), () => {
  describe(fn, () => {
    it('normal', () => {
      const data = factory()
      assertStructUnion(data, { name, pointer, size })
    })
  })
})

