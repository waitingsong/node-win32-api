import { dirname } from 'path'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = ! process.env.ROLLUP_WATCH

const name = parseName(pkg.name)
const targetDir = dirname(pkg.main)
const deps = pkg.dependencies

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

for (const depName of Object.keys(deps)) {
  external.push(depName)
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
      plugins: [ uglify(uglifyOpts) ],
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
        production && uglify(uglifyOpts),
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

// remove pkg.name extension if exists
function parseName(name) {
  if (name) {
    const arr = name.split('.')
    const len = arr.length

    if (len > 2) {
      return arr.slice(0, -1).join('.')
    }
    else if (len === 2 || len === 1) {
      return arr[0]
    }
  }
  return name
}

export default config

