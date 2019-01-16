/// <reference types="mocha" />

import * as assert from 'power-assert'
import rewire = require('rewire')
import * as rmdir from 'rimraf'
import { from as ofrom, of, EMPTY } from 'rxjs'
import { catchError, defaultIfEmpty, finalize, mergeMap, tap } from 'rxjs/operators'

import {
  assertNever,
  assertNeverRx,
  basename,
  createDir,
  createDirAsync,
  createFileAsync,
  dirExists,
  fileExists,
  isDirExists,
  isFileExists,
  isPathAccessible,
  join,
  normalize,
  pathAccessible,
  readFileAsync,
  tmpdir,
} from '../src/shared/index'

const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'
const mods = rewire('../src/shared/utils')


describe(filename, () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(done => {
    rmdir(tmpDir, err => {
      err && console.error(err)
      done()
    })
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


  it('Should createDirAsync() works', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    try {
      const path = await createDirAsync(randomPath)
      assert(path === normalize(randomPath))
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isDirExists(randomPath)) {
      return assert(false, `folder not exists, path: "${randomPath}"`)
    }

    rmdir(randomPath, err => err && console.error(err))
  })

  it('Should createDirAsync() works with odd path', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}/.test/0ab`

    try {
      const path = await createDirAsync(randomPath)
      assert(path === normalize(randomPath))
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isDirExists(randomPath)) {
      return assert(false, `folder not exists, path: "${randomPath}"`)
    }

    rmdir(randomPath, err => err && console.error(err))
  })


  it('Should createDirAsync() works with blank param', resolve => {
    createDirAsync('')
      .then(() => {
        assert(false, 'should throw error, but NOT')
        resolve()
      })
      .catch(() => resolve())
  })

  it('Should createFileAsyncAsync() works', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      const path = await createFileAsync(file, random)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
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

  it('Should createFileAsync() works with options', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const json = { key: random }
    const str = JSON.stringify(json)
    const opts = { mode: 0o640 }

    try {
      const path = await createFileAsync(file, json, opts)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
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

  it('Should createFileAsync() works with object data', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const json = { key: random }
    const str = JSON.stringify(json)

    try {
      const path = await createFileAsync(file, json)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
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

  it('Should createFileAsync() works with blank path', resolve => {
    createFileAsync('', '')
      .then(() => {
        assert(false, 'should throw error, but NOT')
        resolve()
      })
      .catch(() => resolve())
  })

  it('Should createFileAsync() works with buffer data', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const buf = Buffer.from(random.toString())

    try {
      const path = await createFileAsync(file, buf)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      return assert(false, ex)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFileAsync(file)).toString('utf8')

      assert(ret === buf.toString(), `content not equal. write:"${buf.toString()}", read: "${ret}"`)
    }
    catch (ex) {
      assert(false, ex)
    }

    rmdir(randomPath, err => err && console.error(err))
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


describe(filename + ' :pathAcessible()', () => {
  after(done => {
    rmdir(tmpDir, err => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'pathAcessible'

  it(`Should ${fnName}() works`, done => {
    const dir = tmpdir()
    return of(dir).pipe(
      mergeMap(pathAccessible),
    ).subscribe(
      (path => {
        assert(path === dir, `sytem temp path should accessible: "${dir}"`)
        done()
      }),
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

  it(`Should ${fnName}() works with invalid value`, async () => {
    const dir = join(tmpDir, Math.random().toString())

    const ret = await pathAccessible('').toPromise()
    assert(ret === '', 'should return false with blank path:' + ret)

    if (await pathAccessible(dir).toPromise()) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    if (await pathAccessible(dir).toPromise()) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    await createDirAsync(dir)
    if (! await pathAccessible(dir).toPromise()) {
      return assert(false, `path should accessible: "${dir}"`)
    }
  })

})

describe(filename + ' :isPathAcessible()', () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(done => {
    rmdir(tmpDir, err => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'isPathAcessible'

  it(`Should ${fnName}() works`, async () => {
    const dir = tmpdir()

    assert(isPathAccessible(dir), `sytem temp path should accessible: "${dir}"`)
  })

  it(`Should ${fnName}() works with invalid value`, async () => {
    const dir = join(tmpDir, Math.random().toString())

    if (await isPathAccessible('')) {
      return assert(false, 'should return false with blank path')
    }

    if (await isPathAccessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    if (await isPathAccessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    await createDirAsync(dir)
    if (! await isPathAccessible(dir)) {
      return assert(false, `path should accessible: "${dir}"`)
    }
  })

})


describe(filename + ' :dirExists()', () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(done => {
    rmdir(tmpDir, err => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'dirExists'

  it(`Should ${fnName}() works`, done => {
    return of(tmpDir).pipe(
      mergeMap(dirExists),
    ).subscribe(
      (path => {
        assert(path && path === tmpDir, `path should exists: "${tmpDir}"`)
        done()
      }),
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

  it(`Should ${fnName}() works with invalid path`, done => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    return of(randomPath).pipe(
      mergeMap(dirExists),
    ).subscribe(
      (path => {
        assert(path === '', `path should NOT exists: "${randomPath}"`)
        done()
      }),
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

  it(`Should ${fnName}() works with blank path`, done => {
    return of('').pipe(
      mergeMap(dirExists),
    ).subscribe(
      (path => {
        assert(path === '', 'empty path should NOT exists')
        done()
      }),
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

})


describe(filename + ' :createDir()', () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(done => {
    rmdir(tmpDir, err => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'createDir'

  it(`Should ${fnName}() works`, done => {
    const paths = [
      `${tmpDir}/${pathPrefix}-${Math.random()}`,
      `${tmpDir}/${pathPrefix}-${Math.random()}/.test/0ab`,
    ]

    return ofrom(paths).pipe(
      mergeMap(path => {
        return createDir(path).pipe(
          tap(retPath => {
            assert(retPath === normalize(path))
          }),
        )
      }),
      mergeMap(dirExists),
    ).subscribe(
      (path => {
        assert(path.length)
        rmdir(path, err => err && console.error(err))
      }),
      (err: Error) => {
        assert(false, err.message)
        done()
      },
      done,
    )
  })


  it(`Should ${fnName}() works with blank param`, done => {
    return of('').pipe(
      mergeMap(createDir),
      mergeMap(dirExists),
    ).subscribe(
      (path => {
        assert(false, 'should throw error, but NOT with' + path)
        done()
      }),
      (err: Error) => {
        assert(true, err.message)
        done()
      },
    )
  })

})

describe(filename, () => {
  const fnName = 'assertNever'

  it(`Should ${fnName}() works`, () => {
    try {
      assertNever(<never> 'foo')
      assert(false, 'Should throw error but not')
    }
    catch {
      assert(true)
    }
  })
})

describe(filename, () => {
  const fnName = 'assertNeverObb'

  it(`Should ${fnName}() works`, done => {
    const ret$ = assertNeverRx(<never> 'foo')

    ret$.pipe(
      defaultIfEmpty(''),
      tap(() => {
        assert(false, 'Should not emit value')
      }),
      catchError(() => EMPTY),
      finalize(() => done()),
    ).subscribe()
  })
})


describe(filename, () => {
  const fnName = 'fileExist'

  it(`Should ${fnName}() works`, async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    assert(await fileExists(file).toPromise() === '', `file should not exists, path: "${file}"`)
    try {
      const path = await createFileAsync(file, random)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
      assert(await fileExists(file).toPromise() === normalize(file), `file not exists, path: "${file}"`)
    }
    catch (ex) {
      assert(false, ex.message)
      rmdir(randomPath, () => {})
    }
  })
})


describe(filename, () => {
  const fnName = 'isFileExists'

  it(`Should ${fnName}() works`, async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      assert(await isFileExists(file) === false, `file should not exists, path: "${file}"`)
      assert(await isFileExists('') === false, `file should not exists, path: "${file}"`)
      const path = await createFileAsync(file, random)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      assert(false, ex.message)
      rmdir(randomPath, () => {})
    }
  })
})


describe(filename, () => {
  const fnName = 'createDir'

  it(`Should ${fnName}() works`, async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      const path = await createDir(randomPath).toPromise()
      assert(path === normalize(randomPath))
      const path2 = await createDir(randomPath).toPromise()
      assert(path2 === normalize(randomPath))
    }
    catch (ex) {
      assert(false, ex.message)
      rmdir(randomPath, () => {})
    }
  })
})

