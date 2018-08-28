const base = require('./karma.base.conf.js')

if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
  console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.')
  process.exit(1)
}

const {
	TRAVIS_BRANCH,
	TRAVIS_BUILD_NUMBER,
	TRAVIS_JOB_NUMBER,
} = process.env


/**
 * Available browsers and platforms: 
 * https://saucelabs.com/platforms
 * https://saucelabs.com/rest/v1/info/platforms/webdriver
 */
const sl_launchers = {
  sl_edge_latest_Windows10: createCustomLauncher('MicrosoftEdge', 'latest', 'Windows 10'),
  sl_edge_16_Windows10: createCustomLauncher('MicrosoftEdge', '16.16299', 'Windows 10'),
  sl_edge_15_Windows10: createCustomLauncher('MicrosoftEdge', '15.15063', 'Windows 10'),
  sl_edge_14_Windows10: createCustomLauncher('MicrosoftEdge', '14.14393', 'Windows 10'),
  sl_edge_13_Windows10: createCustomLauncher('MicrosoftEdge', '13.10586', 'Windows 10'),

  sl_chrome_dev_Windows10: createCustomLauncher('chrome', 'dev', 'Windows 10'),
  sl_chrome_latest_Windows10: createCustomLauncher('chrome', 'latest', 'Windows 10'),
  // sl_chrome_32_Windows10: createCustomLauncher('chrome', '32', 'Windows 10'),

  sl_chrome_latest_Windows8_1: createCustomLauncher('chrome', 'latest', 'Windows 8.1'),
  sl_chrome_32_Windows8_1: createCustomLauncher('chrome', '32', 'Windows 8.1'),

  sl_chrome_latest_Windows7: createCustomLauncher('chrome', 'latest', 'Windows 7'),
  sl_chrome_32_Windows7: createCustomLauncher('chrome', '32', 'Windows 7'),

  sl_chrome_dev_Mac10_13: createCustomLauncher('chrome', 'dev', 'macOS 10.13'),
  sl_chrome_latest_Mac10_13: createCustomLauncher('chrome', 'latest', 'macOS 10.13'),

  sl_firefox_dev_Windows10: createCustomLauncher('firefox', 'dev', 'Windows 10'),
  sl_firefox_latest_Windows10: createCustomLauncher('firefox', 'latest', 'Windows 10'),
  // sl_firefox_30_Windows10: createCustomLauncher('firefox', '30', 'Windows 10'), 

  sl_firefox_latest_Windows8_1: createCustomLauncher('firefox', 'latest', 'Windows 8.1'),
  sl_firefox_30_Windows8_1: createCustomLauncher('firefox', '30', 'Windows 8.1'), 

  sl_firefox_latest_Windows7: createCustomLauncher('firefox', 'latest', 'Windows 7'), 
  sl_firefox_30_Windows7: createCustomLauncher('firefox', '30', 'Windows 7'), 

  sl_firefox_dev_Mac10_13: createCustomLauncher('firefox', 'dev', 'macOS 10.13'),
  sl_firefox_latest_Mac10_13: createCustomLauncher('firefox', 'latest', 'macOS 10.13'),

  sl_ie_11_Windows10: createCustomLauncher('internet explorer', '11.103', 'Windows 10'),
  sl_ie_11_Windows8_1: createCustomLauncher('internet explorer', '11', 'Windows 8.1'),
  sl_ie_11_Windows7: createCustomLauncher('internet explorer', '11', 'Windows 7'),

  sl_safari_11_1_Mac10_13: createCustomLauncher('safari', '11.1', 'macOS 10.13'),
  sl_safari_11_Mac10_12: createCustomLauncher('safari', '11.0', 'macOS 10.12'),
  sl_safari_10_1_Mac10_12: createCustomLauncher('safari', '10.1', 'macOS 10.12'),
  sl_safari_10_Mac10_11: createCustomLauncher('safari', '10.0', 'OS X 10.11'),

  sl_android_7_1: {
    base: 'SauceLabs',
    deviceName: 'Android GoogleAPI Emulator',
    browserName: 'Chrome',
    platformVersion: '7.1',
    platformName: 'Android',
  },
  sl_android_6: {
    base: 'SauceLabs',
    deviceName: 'Android Emulator',
    browserName: 'Chrome',
    platformVersion: '6.0',
    platformName: 'Android',
  },
  sl_android_5_0: {
    base: 'SauceLabs',
    deviceName: 'Android Emulator',
    browserName: 'Browser',
    platformVersion: '5.0',
    platformName: 'Android',
  },
  sl_android_4_4: {
    base: 'SauceLabs',
    deviceName: 'Android Emulator',
    browserName: 'Browser',
    platformVersion: '4.4',
    platformName: 'Android',
  },

  sl_ipad_11_3: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPad Simulator',
    platformVersion: '11.3',
    platformName: 'iOS',
  },
  sl_ipad_11_2: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPad Simulator',
    platformVersion: '11.2',
    platformName: 'iOS',
  },
  sl_ipad_10_3: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPad Simulator',
    platformVersion: '10.3',
    platformName: 'iOS',
  },
  sl_ipad_9_3: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPad Simulator',
    platformVersion: '9.3',
    platformName: 'iOS',
  },

  sl_iphone_11_3: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone Simulator',
    platformVersion: '11.3',
    platformName: 'iOS',
  },
  sl_iphone_11_2: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone Simulator',
    platformVersion: '11.2',
    platformName: 'iOS',
  },
  sl_iphone_10_3: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone Simulator',
    platformVersion: '10.3',
    platformName: 'iOS',
  },
  sl_iphone_9_3: {
    base: 'SauceLabs',
    browserName: 'Safari',
    deviceName: 'iPhone Simulator',
    platformVersion: '9.3',
    platformName: 'iOS',
  },

  // sl_iphoneX_latest: {
  //   base: 'SauceLabs',
  //   browserName: 'Safari',
  //   deviceName: 'iPhone X Simulator',
  //   platformVersion: 'latest',
  //   platformName: 'iOS',
  // },

}


module.exports = function(config) {

  // turn off coverage for sauce
  base.karmaTypescriptConfig.coverageOptions.instrumentation = false

  config.set(Object.assign(base, {
    sauceLabs: {
      build: TRAVIS_JOB_NUMBER || `test-${new Date().toISOString()}`,
      public: 'public',
      recordScreenshots: false,
      recordVideo: false,
      tags: [TRAVIS_BRANCH || 'local'],
      testName: 'RxxFetch cross browsers tests',
    },

    // to solve karma connection failure, but not works on edge>=14
    // hostname: '127.0.0.1',

    captureTimeout: 5 * 60000,
    browserNoActivityTimeout: 5 * 60000,
    // browserDisconnectTimeout: 15000,

    customLaunchers: sl_launchers,
    browsers: Object.keys(sl_launchers),

    reporters: base.reporters.concat([
      'dots',
      'saucelabs',
    ]),

    concurrency: 1,
  }))
}

function createCustomLauncher(browser, version, platform) {
  return {
    base: 'SauceLabs',
    browserName: browser,
    platform: platform,
    version: version,
  }
}
