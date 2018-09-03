import { dirname } from 'path'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

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

const targetDir = dirname(pkg.main)
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
`.trimLeft()
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
const external = [
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


const config = [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    external: external.concat(nodeModule),
    input: pkg.module,
    output: [
      {
        banner,
        format: 'es',
        file: pkg.es2015,
      },
      { file: pkg.main,
        amd: { id: name },
        banner,
        format: 'cjs',
        globals,
        name,
      },
    ],
  },

]

if (production) {
  config.push(
    // esm minify
    {
      external: external.concat(nodeModule),
      input: pkg.module,
      plugins: [ terser(uglifyOpts) ],
      output: {
        banner,
        file: parseName(pkg.es2015) + '.min.js',
        format: 'es',
        sourcemap: true,
      },
    },
  )
}

if (pkg.browser) {
  config.push(
    // umd bundle min
    {
      external: nodeModule,
      input: pkg.module,
      plugins: [
        resolve({
          browser: true,
          jsnext: true,
          main: true,
        }),
        commonjs(),
        production && terser(uglifyOpts),
      ],
      output: {
        amd: { id: name },
        banner,
        file: `${targetDir}/${name}.umd.min.js`,
        format: 'umd',
        globals,
        name,
        sourcemap: production ? true : false,
      },
    },
  )
}

if (pkg.bin) {
  const shebang = `#!/usr/bin/env node\n\n${banner}`

  for (const binPath of Object.values(pkg.bin)) {
    if (! binPath) {
      continue
    }
    const binSrcPath = binPath.includes('dist/') ? binPath : `./dist/${binPath}`

    config.push({
      external: external.concat(nodeModule),
      input: binSrcPath,
      output: [
        {
          file: binPath,
          banner: shebang,
          format: 'cjs',
          globals,
        },
      ],
    })
  }

}



// remove pkg.name extension if exists
function parseName(name) {
  if (typeof name === 'string' && name) {
    const arr = name.split('.')
    const len = arr.length

    if (len > 2) {
      return arr.slice(0, -1).join('.')
    }
    else if (len === 2 || len === 1) {
      return arr[0]
    }
  }
  else {
    throw new TypeError('name invalid')
  }
  return name
}

export default config

