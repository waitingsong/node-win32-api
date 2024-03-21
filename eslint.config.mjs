import eslint from 'typescript-eslint'
import srcConfig from '@waiting/eslint-config'
import testConfig from '@waiting/eslint-config/test'


const CI = !! ((process.env['CI']
  ?? process.env['MIDWAY_SERVER_ENV'] === 'unittest')
  || process.env['MIDWAY_SERVER_ENV'] === 'local'
  || process.env['NODE_ENV'] === 'unittest'
  || process.env['NODE_ENV'] === 'local'
)

const srcRules = {
  'import/no-extraneous-dependencies': [2, {
    devDependencies: false,
    optionalDependencies: false,
    bundledDependencies: false,
    packageDir: [
      './',
      '../../node_modules/@mwcp/share/',
    ],
  }],
}
const testRules = {
}

if (CI) {
  srcRules['@stylistic/linebreak-style'] = 0
  testRules['@stylistic/linebreak-style'] = 0
}

const languageOptions = {
  parserOptions: {
    // project: 'tsconfig.eslint.json',
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: import.meta.dirname,
  },
}

export default eslint.config(
  {
    files: ['packages/*/src/**/*.ts', 'src/**/*.ts'],
    extends: [
      ...srcConfig,
    ],
    rules: srcRules,
    languageOptions,
  },
  {
    files: ['packages/*/test/**/*.ts', 'test/**/*.ts'],
    extends: [
      ...testConfig,
    ],
    rules: testRules,
    languageOptions,
  }
)

