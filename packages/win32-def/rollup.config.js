import { basename, dirname } from 'node:path'
import assert from 'node:assert'

import dts from "rollup-plugin-dts"

import pkg from './package.json' with { type: 'json' }

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = ! process.env.ROLLUP_WATCH
let name = pkg.name

if (name.slice(0, 1) === '@') {
  name = name.split('/')[1]
  if (! name) {
    throw new TypeError('pkg.name invalid')
  }
}
name = parseName(name)
console.log({ name })

const deps = pkg.dependencies
const peerDeps = pkg.peerDependencies

const banner = `
/**
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version ${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 * @link ${pkg.homepage}
 */
`.trimStart()
const uglifyOpts = {
  mangle:   true,
  compress: {
    unused:        false,
    sequences:     true,
    dead_code:     true,
    conditionals:  true,
    booleans:      true,
    if_return:     true,
    join_vars:     true,
    drop_console:  false,
    drop_debugger: false,
    typeofs:       false,
  },
  output: {
    preamble: banner,
  },
}

const globals = {
  'rxjs/operators': 'rxjs.operators',
  'rxjs/websocket': 'rxjs.websocket',
}
let external = [
  'rxjs', 'rxjs/operators', 'rxjs/websocket', 'rxjs/ajax',
]
const nodeModule = [
  'fs', 'path', 'util', 'os',
]

if (deps && Object.keys(deps).length) {
  for (const depName of Object.keys(deps)) {
    external.push(depName)
  }
}
if (peerDeps && Object.keys(peerDeps).length) {
  for (const depName of Object.keys(peerDeps)) {
    external.push(depName)
  }
}
external = [...new Set(external)]

const config = []
const input = 'dist/index.js'

if (pkg.exports) {
  Object.entries(pkg.exports).forEach(([key, row]) => {
    if (typeof row !== 'object') { return }
    if (! row.import && ! row.require) { return }

    const names = genFileNamesForCTS(row)

    config.push(
      {
        external: external.concat(nodeModule),
        input: row.import,
        output: [
          {
            file: row.require,
            banner,
            format: 'cjs',
            globals,
            sourcemap: true,
            sourcemapExcludeSources: true,
          },
        ],
      },
      {
        external: external.concat(nodeModule),
        input: names.srcPath,
        output: [
          {
            file: names.ctsPath,
            format: 'cjs',
          },
        ],
        plugins: [dts()],
      },
    )
  })
}
else if (pkg.main) {
  config.push(
    {
      external: external.concat(nodeModule),
      input,
      output: [
        {
          file: 'dist/index.cjs',
          amd: { id: name },
          banner,
          format: 'cjs',
          globals,
          name,
          sourcemap: true,
          sourcemapExcludeSources: true,
        },
      ],
    },
  )
}


/*
if (production) {
  config.push(
    // esm minify
    {
      external: external.concat(nodeModule),
      input,
      plugins: [ terser(uglifyOpts) ],
      output: {
        banner,
        file: 'dist/index.min.mjs',
        format: 'es',
        sourcemap: true,
        sourcemapExcludeSources: true,
      },
    },
    // cjs minify
    {
      external: external.concat(nodeModule),
      input,
      plugins: [ terser(uglifyOpts) ],
      output: {
        banner,
        file: 'dist/index.min.cjs',
        format: 'cjs',
        sourcemap: true,
        sourcemapExcludeSources: true,
      },
    },
  )
}
*/

if (pkg.bin) {
  // const shebang = `#!/usr/bin/env node\n\n${banner}`
  const shebang = `#!/usr/bin/env ts-node-esm\n\n${banner}`

  for (const binPath of Object.values(pkg.bin)) {
    if (! binPath) {
      continue
    }
    const binSrcPath = binPath.includes('bin/') && ! binPath.includes('dist/bin/')
      ? binPath.replace('bin/', 'dist/bin/')
      : binPath

    config.push({
      external: external.concat(nodeModule),
      input: binSrcPath,
      output: [
        {
          file: binPath,
          banner: shebang,
          // format: 'cjs',
          format: 'esm',
          globals,
        },
      ],
    })
  }

}



// remove pkg.name extension if exists
function parseName(name) {
  if (typeof name === 'string' && name) {
    return basename(name)
  }
  else {
    throw new TypeError('name invalid')
  }
}

function genFileNamesForCTS(row) {
  const path = row.import
  assert(path, 'path is required')
  assert(typeof path === 'string', 'path must be a string')

  let srcPath = row.types
  let baseName = ''
  const dir =  dirname(path)

  if (path.startsWith('./src/') && path.endsWith('.ts')) {
    baseName = basename(path, '.ts')
    // srcPath = srcPath ?? path
    srcPath = srcPath ?? dir.replace('dist', 'src') + `/${baseName}.ts`
  }
  else if (path.startsWith('./dist/') && path.endsWith('.js')) {
    baseName = basename(path, '.js')
    srcPath = srcPath ?? dir.replace('dist', 'src') + `/${baseName}.ts`
  }

  const ctsPath = `${dir}/${baseName}.d.cts`
  const ret = {
    srcPath,
    ctsPath,
  }
  // console.log({ ret, dir })
  return ret
}

export default config

