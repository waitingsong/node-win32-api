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
  'rxjs', 'rxjs/operators', 'rxjs/websocket',
  'fs', 'path', 'util', 'os',
]
const nodeModule = [
  'fs', 'path', 'util', 'os',
]


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

  // esm minify
  {
    external: production 
      ? external.concat(nodeModule)
      : nodeModule,
    input: pkg.module,
    plugins: production
      ? [ uglify(uglifyOpts) ]
      : [
        resolve({
          browser: true,
          jsnext: true,
          main: true,
        }),
        commonjs(),
      ],
    output: {
      banner,
      file: parseName(pkg.es2015) + '.min.js',
      format: 'es',
      sourcemap: production ? true : false,
    },
  },

]

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
  if (name && name.slice(-3).toLowerCase() === '.js') {
    return name.slice(0, -3)
  }
  return name
}

export default config

