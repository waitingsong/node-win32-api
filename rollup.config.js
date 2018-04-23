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
 * @license MIT
 * @link ${pkg.homepage}
 */
`.trim()
const globals = {
  'rxjs/operators': 'rxjs.operators',
}

const config = [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    external: ['rxjs', 'rxjs/operators', 'fs', 'path', 'util', 'os'],
    input: pkg.module,
    output: [
      { 
        banner,
        format: 'es',
        file: pkg.es2015, 
      },
      { file: pkg.main, 
        amd: { id: pkg.name },
        banner,
        format: 'umd',
        globals,
        name: pkg.name,
      },
    ],
  },
]

// browser-friendly UMD build
if (pkg.browser ) {
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
      amd: { id: pkg.name },
      banner,
      file: pkg.browser,
      format: 'umd',
      globals,
      name: pkg.name,
      sourcemap: true,
    },
  })
}

export default config

