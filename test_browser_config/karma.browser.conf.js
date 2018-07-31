const base = require('./karma.base.conf.js')

module.exports = (config) => {
  config.set(Object.assign(base, {
    frameworks: base.frameworks.concat([
      'detectBrowsers',
    ]),

    detectBrowsers: {
      // enable/disable phantomjs support, default is true
      usePhantomJS: false,
    },

    reporters: base.reporters.concat([
      'dots',
    ]),
  }))
}
