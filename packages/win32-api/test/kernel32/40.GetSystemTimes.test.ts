import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import {
  Types as M,
  DTypes as W,
  DStruct as DS,
  StructFactory,
} from '../../src/index.js'
import {
  knl32,
  knl32Sync,
} from '../helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should GetSystemTimes() work', () => {
    it('await', async () => {
      const idleTime = StructFactory<M.FILETIME>(DS.FILETIME)
      const kernelTime = StructFactory<M.FILETIME>(DS.FILETIME)
      const userTime = StructFactory<M.FILETIME>(DS.FILETIME)

      await knl32.GetSystemTimes(idleTime.ref(), kernelTime.ref(), userTime.ref())
      assert(fileTimeToNumber(idleTime) > 0)
      assert(fileTimeToNumber(kernelTime) > 0)
      assert(fileTimeToNumber(userTime) > 0)
    })

    it('sync', () => {
      const idleTime = StructFactory<M.FILETIME>(DS.FILETIME)
      const kernelTime = StructFactory<M.FILETIME>(DS.FILETIME)
      const userTime = StructFactory<M.FILETIME>(DS.FILETIME)

      knl32Sync.GetSystemTimes(idleTime.ref(), kernelTime.ref(), userTime.ref())
      assert(fileTimeToNumber(idleTime) > 0)
      assert(fileTimeToNumber(kernelTime) > 0)
      assert(fileTimeToNumber(userTime) > 0)
    })

    it('callback .async', () => {
      const idleTime = StructFactory<M.FILETIME>(DS.FILETIME)
      const kernelTime = StructFactory<M.FILETIME>(DS.FILETIME)
      const userTime = StructFactory<M.FILETIME>(DS.FILETIME)

      knl32Sync.GetSystemTimes.async(idleTime.ref(), kernelTime.ref(), userTime.ref(), (err) => {
        if (err) {
          return assert(false, err.message ? err.message : 'unknown error')
        }
        assert(fileTimeToNumber(idleTime) > 0)
        assert(fileTimeToNumber(kernelTime) > 0)
        assert(fileTimeToNumber(userTime) > 0)
      })
    })
  })
})


function fileTimeToNumber(fileTime: M.FILETIME): number {
  return fileTime.dwLowDateTime + fileTime.dwHighDateTime * Math.pow(2, 32)
}
