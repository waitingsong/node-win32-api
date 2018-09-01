/// <reference types="mocha" />

import * as assert from 'power-assert'
import rewire = require('rewire')
import * as rmdir from 'rimraf'

import {
  basename,
  createDir,
  createFile,
  isDirExists,
  isFileExists,
  isPathAcessible,
  join,
  readFileAsync,
  tmpdir,
} from '../src/shared/index'

const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'
const mods = rewire('../src/shared/utils')


describe(filename, () => {
  before(async () => {
    await createDir(tmpDir)
  })
  after(done => {
    rmdir(tmpDir, err => err && console.error(err) || done())
  })


  it('Should isDirFileExists() works', async () => {
    const fnName = 'isDirFileExists'
    const fn = <(path: string, type: 'DIR' | 'FILE') => Promise<boolean>> mods.__get__(fnName)

    if (typeof fn !== 'function') {
      return assert(false, `${fnName} is not a function`)
    }

    try {
      assert(await fn(tmpDir, 'DIR'), `user tmp dir should exist. path: "${tmpDir}"`)
    }
    catch (ex) {
      assert(false, ex)
    }
  })

  it('Should isDirFileExists() works with blank path', async () => {
    const fnName = 'isDirFileExists'
    const fn = <(path: string, type: 'DIR' | 'FILE') => Promise<boolean>> mods.__get__(fnName)

    if (typeof fn !== 'function') {
      return assert(false, `${fnName} is not a function`)
    }

    try {
      assert(! await fn('', 'DIR'), 'should return false with blank path')
    }
    catch (ex) {
      assert(false, ex)
    }
  })


  it('Should createDir() works', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    try {
      await createDir(randomPath)
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isDirExists(randomPath)) {
      return assert(false, `folder not exists, path: "${randomPath}"`)
    }

    rmdir(randomPath, err => err && console.error(err))
  })

  it('Should createDir() works with odd path', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}/.test/0ab`

    try {
      await createDir(randomPath)
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isDirExists(randomPath)) {
      return assert(false, `folder not exists, path: "${randomPath}"`)
    }

    rmdir(randomPath, err => err && console.error(err))
  })


  it('Should createDir() works with blank param', resolve => {
    createDir('')
      .then(() => {
        assert(false, 'should throw error, but NOT')
        resolve()
      })
      .catch(() => resolve())
  })

  it('Should createFile() works', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      await createFile(file, random)
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFileAsync(file)).toString('utf8')
      assert(ret === String(random), `content not equal. write:"${random}", read: "${ret}"`)
    }
    catch (ex) {
      assert(false, ex)
    }

    rmdir(randomPath, err => err && console.error(err))
  })

  it('Should createFile() works with options', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const json = { key: random }
    const str = JSON.stringify(json)
    const opts = { mode: 0o640 }

    try {
      await createFile(file, json, opts)
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFileAsync(file)).toString('utf8')

      assert(ret === str, `content not equal. write:"${str}", read: "${ret}"`)
    }
    catch (ex) {
      assert(false, ex)
    }

    rmdir(randomPath, err => err && console.error(err))
  })

  it('Should createFile() works with object data', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const json = { key: random }
    const str = JSON.stringify(json)

    try {
      await createFile(file, json)
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFileAsync(file)).toString('utf8')

      assert(ret === str, `content not equal. write:"${str}", read: "${ret}"`)
    }
    catch (ex) {
      assert(false, ex)
    }

    rmdir(randomPath, err => err && console.error(err))
  })

  it('Should createFile() works with blank path', resolve => {
    createFile('', '')
      .then(() => {
        assert(false, 'should throw error, but NOT')
        resolve()
      })
      .catch(() => resolve())
  })


  it('Should isDirExists() works', async () => {
    try {
      assert(await isDirExists(tmpDir), `path should exists: "${tmpDir}"`)
    }
    catch (ex) {
      assert(false, ex)
    }
  })

  it('Should isDirExists() works with invalid path', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    try {
      assert(! await isDirExists(randomPath), `path should NOT exists: "${randomPath}"`)
    }
    catch (ex) {
      assert(false, ex)
    }
  })

  it('Should isDirExists() works with blank path', async () => {
    try {
      assert(! await isDirExists(''), 'empty path should NOT exists')
    }
    catch (ex) {
      assert(false, ex)
    }
  })

})


describe(filename + ' :isPathAcessible()', () => {
  after(done => {
    rmdir(tmpDir, err => err && console.error(err) || done())
  })

  const fnName = 'isPathAcessible'

  it(`Should ${fnName}() works`, async () => {
    const dir = tmpdir()

    assert(isPathAcessible(dir), `sytem temp path should accessible: "${dir}"`)
  })

  it(`Should ${fnName}() works with invalid value`, async () => {
    const dir = join(tmpDir, Math.random().toString())

    if (await isPathAcessible('')) {
      return assert(false, 'should return false with blank path')
    }

    if (await isPathAcessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    if (await isPathAcessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    await createDir(dir)
    if (! await isPathAcessible(dir)) {
      return assert(false, `path should accessible: "${dir}"`)
    }
  })
})
