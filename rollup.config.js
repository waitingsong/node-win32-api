import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

const config = [
  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    external: ['rxjs', 'rxjs/operators', 'fs', 'path', 'util', 'os'],
      input: pkg.module,
      output: [
        { file: pkg.main, format: 'cjs' },
      ],
  },
]

// browser-friendly UMD build
if (pkg.browser ) {
  config.push({
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
        file: pkg.browser,
        format: 'umd',
        name: pkg.name,
        sourcemap: true,
      },
  })
}

export default config

