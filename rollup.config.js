import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
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
`.trim()
const globals = {
  'rxjs/operators': 'rxjs.operators',
  'rxjs/websocket': 'rxjs.websocket',
}
const name = parseUMDName(pkg.name)
const external = [
  'rxjs', 'rxjs/operators', 'rxjs/websocket', 
  'fs', 'path', 'util', 'os',
]


const config = [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    external,
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
        format: 'umd',
        globals,
        name,
      },
    ],
  },
]

// browser-friendly UMD build
if (pkg.browser ) {
  // bundle
  config.push({
    external: [],
    input: pkg.module,
    plugins: [
      resolve({
        browser: true,
        jsnext: true,
        main: true,
      }),
      commonjs(),
    ],
    output: {
      amd: { id: name },
      banner,
      file: pkg.browser,
      format: 'umd',
      globals,
      name,
    },
  })

  // bundle min
  config.push({
    external: [],
    input: pkg.module,
    plugins: [
      resolve({
        browser: true,
        jsnext: true,
        main: true,
      }),
      commonjs(),
      production && uglify(),
    ],
    output: {
      amd: { id: name },
      banner,
      file: pkg.browser.slice(0, -3) + '.min.js',
      format: 'umd',
      globals,
      name,
      sourcemap: true,
    },
  })
}

// remove pkg.name extension if exists
function parseUMDName(name) {
  if (name && name.slice(-3).toLowerCase() === '.js') {
    return name.slice(0, -3)
  }
  return name
}

export default config

