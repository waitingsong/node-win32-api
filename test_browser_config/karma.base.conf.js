module.exports = {
  basePath: '..',

  frameworks: [
    'mocha',
    'karma-typescript',
  ],

  files: [
    './test_browser/**/*.test.ts',
  ],

  exclude: [],

  preprocessors: {
    '**/*.ts': ['karma-typescript'],
  },

  karmaTypescriptConfig: {
    coverageOptions: {
      // tsconfig: './test/tsconfig.json',
      // coverage is on by default in karma-typescript
      instrumentation: true,
    },
    compilerOptions: {
      declaration: false,
      lib: ['es2017', 'dom'],
      target: 'es5',
      module: 'commonjs',
      moduleResolution: 'node',
      allowJs: false,
      strict: true,
    },
    include: [
      './test_browser/**/*.ts',
    ]
  },

  reporters: [
    'karma-typescript',
  ],

  // web server port
  // port: 9876,
  // runnerPort: 9100,

  colors: true,


  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  // logLevel: config.LOG_INFO,

  autoWatch: false,

  mime: {
    'text/x-typescript': ['ts', 'tsx'],
  },

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: true,

  // concurrency: Infinity,
}
