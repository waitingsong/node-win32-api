import eslint from 'typescript-eslint'

import srcConfig from '@waiting/eslint-config'
import testConfig from '@waiting/eslint-config/test'
import { genCurrentDirname, genModuleAbsolutePathIfExists } from '@waiting/shared-core'


const projectDir = genCurrentDirname(import.meta.url)

const srcRules = {
  'import/no-extraneous-dependencies': [2, {
    devDependencies: false,
    optionalDependencies: false,
    bundledDependencies: false,
    packageDir: [
      '.',
      await genModuleAbsolutePathIfExists(projectDir, 'node_modules/@waiting/shared-core') ?? '.',
      await genModuleAbsolutePathIfExists(projectDir, 'node_modules/@mwcp/share') ?? '.',
    ],
  }],
  'id-length': 0,
  "@typescript-eslint/no-unused-vars": 0,
  '@typescript-eslint/prefer-ts-expect-error': 0,
  '@typescript-eslint/no-duplicate-enum-values': 0,
  'node/no-extraneous-import': 0,
  'unicorn/filename-case': 0,
  "linebreak-style": 0,
  'node/shebang': 0,
}
const testRules = {
  '@typescript-eslint/no-explicit-any': 0,
}

const languageOptions = {
  parserOptions: {
    // project: 'tsconfig.eslint.json',
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.eslint.json'],
    tsconfigRootDir: import.meta.dirname,
  },
}

export default eslint.config(
  {
    files: ['packages/*/src/**/*.ts', 'src/**/*.ts', 'packages/*/demo/**/*.mts' , 'packages/*/demo/**/*.ts'],
    ignores: ['**/*.d.ts'],
    extends: [
      ...srcConfig,
    ],
    rules: srcRules,
    languageOptions,
  },
  {
    files: ['packages/*/test/**/*.ts', 'test/**/*.ts'],
    ignores: ['**/*.d.ts'],
    extends: [
      ...testConfig,
    ],
    rules: testRules,
    languageOptions,
  }
)

