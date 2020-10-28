# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [9.6.0](https://github.com/waitingsong/node-win32-api/compare/v9.5.0...v9.6.0) (2020-10-28)


### Features

* **win32-api:** add kernel32.GenerateConsoleCtrlEvent() ([ecc6fef](https://github.com/waitingsong/node-win32-api/commit/ecc6fef9b8cc6debf3e996ceaeb17dbee541ddb1))





# [9.5.0](https://github.com/waitingsong/node-win32-api/compare/v9.4.0...v9.5.0) (2020-06-08)


### Features

* **win32-api:** export Constants ([1f6c5eb](https://github.com/waitingsong/node-win32-api/commit/1f6c5eb6198ec28f6335cd95e432d7354117e5f3))
* **win32-api:** export CS as alias of Constants ([0e2f8e1](https://github.com/waitingsong/node-win32-api/commit/0e2f8e100d1e072990b0dfc75fa3766bf341a4aa))
* **win32-api:** update Constants ([b6f352f](https://github.com/waitingsong/node-win32-api/commit/b6f352f6f4dbd64ad872d5d06192efe46deafb1c))





# [9.4.0](https://github.com/waitingsong/node-win32-api/compare/v9.3.0...v9.4.0) (2020-06-07)


### Bug Fixes

* **win32-api:** gen_api_opts() ([4615eaf](https://github.com/waitingsong/node-win32-api/commit/4615eaf3c667e82a774c8fb2c1e04ea00f593e20))


### Features

* **win32-api:** upgrade deps ([a53ae3e](https://github.com/waitingsong/node-win32-api/commit/a53ae3e6904a32ecf9e304066ba1426b1f06c451))





# [9.3.0](https://github.com/waitingsong/node-win32-api/compare/v9.2.0...v9.3.0) (2020-03-29)


### Features

* **win32-api:** add user32.PrintWindow() ([2ef8b43](https://github.com/waitingsong/node-win32-api/commit/2ef8b43f2ef7bf743c580eaf4d012ff0f21d05ad))





# [9.2.0](https://github.com/waitingsong/node-win32-api/compare/v9.1.0...v9.2.0) (2020-02-09)


### Features

* **win32-api:** add struct-ext RID_DEVICE_INFO ([880b10b](https://github.com/waitingsong/node-win32-api/commit/880b10bfff34482f049c6fb7ddc2c4363a889cff))
* **win32-api:** add user32.GetRawInputDeviceInfoW() ([8f5d45f](https://github.com/waitingsong/node-win32-api/commit/8f5d45f8f2e2a4c2d3fc5e78a516c3eef9e87aad))
* **win32-api:** add user32.GetRawInputDeviceList() ([dcd6c35](https://github.com/waitingsong/node-win32-api/commit/dcd6c356f449ead006dad67ab52602c6aae329aa))
* **win32-api:** add user32.SetForegroundWindow() ([2b18384](https://github.com/waitingsong/node-win32-api/commit/2b18384d85a7455abf045e5daf78ada68a7f634a))
* add user32.GetAltTabInfoW() ([3916c8e](https://github.com/waitingsong/node-win32-api/commit/3916c8ee321eab98ec9aac01bc16c86663ed27f9))
* **win32-api:** add user32.GetWindowRect() ([b3550bd](https://github.com/waitingsong/node-win32-api/commit/b3550bd67d5f28097cf46fb5f69b9367f371bf24))





# [9.1.0](https://github.com/waitingsong/node-win32-api/compare/v9.0.0...v9.1.0) (2020-02-06)


### Features

* add user EnumDisplayDevicesW() ([9a9e321](https://github.com/waitingsong/node-win32-api/commit/9a9e3213d5bfa59a8b43f81c53b2aee41cec4568))





# [9.0.0](https://github.com/waitingsong/node-win32-api/compare/v8.0.0...v9.0.0) (2020-01-21)


* refactor!: change type of handle from Buffer to number (uint32/uint64) ([47be79e](https://github.com/waitingsong/node-win32-api/commit/47be79e0875bb8b33575ba4cb815705a4e161d87))


### BREAKING CHANGES

* the apis accept only number|bignum|string, no null any more





# [8.0.0](https://github.com/waitingsong/node-win32-api/compare/v7.1.0...v8.0.0) (2020-01-10)

**Note:** Version bump only for package win32-api





# [7.1.0](https://github.com/waitingsong/node-win32-api/compare/v7.0.2...v7.1.0) (2020-01-10)


### Features

* **win32-api:** define CW_USEDEFAULT in user32/constants.ts ([697e4df](https://github.com/waitingsong/node-win32-api/commit/697e4dfcef565fa9e3bf662ce888e714ba7eb814))





## [7.0.2](https://github.com/waitingsong/node-win32-api/compare/v7.0.1...v7.0.2) (2019-12-23)

**Note:** Version bump only for package win32-api





## [7.0.1](https://github.com/waitingsong/node-win32-api/compare/v7.0.0...v7.0.1) (2019-12-23)

**Note:** Version bump only for package win32-api





# [7.0.0](https://github.com/waitingsong/node-win32-api/compare/v6.2.0...v7.0.0) (2019-12-23)


### chore

* **deps:** use ffi-napi instead of ffi ([bfa006c](https://github.com/waitingsong/node-win32-api/commit/bfa006c468e93813cfedce68eb2e94fd901058cc))


### BREAKING CHANGES

* **deps:** remove nodejs v8 support





# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.2.0](https://github.com/waitingsong/node-win32-api/compare/v6.1.0...v6.2.0) (2019-10-11)

# [6.1.0](https://github.com/waitingsong/node-win32-api/compare/v6.0.0...v6.1.0) (2019-03-17)


### Features

* **kernel32:** add GetSystemTimes() ([9a7587f](https://github.com/waitingsong/node-win32-api/commit/9a7587f))



<a name="3.9.0"></a>
# [3.9.0](https://github.com/waitingsong/node-win32-api/compare/v3.8.0...v3.9.0) (2019-02-22)


### Features

* add user32.PostMessageW() ([7b02830](https://github.com/waitingsong/node-win32-api/commit/7b02830))



<a name="3.8.0"></a>
# [3.8.0](https://github.com/waitingsong/node-win32-api/compare/v3.7.1...v3.8.0) (2019-02-22)


### Features

* add user32.SendMessageW() ([a3036d6](https://github.com/waitingsong/node-win32-api/commit/a3036d6))



<a name="3.7.1"></a>
## [3.7.1](https://github.com/waitingsong/node-win32-api/compare/v3.7.0...v3.7.1) (2019-02-22)



<a name="3.7.0"></a>
# [3.7.0](https://github.com/waitingsong/node-win32-api/compare/v3.6.0...v3.7.0) (2019-02-21)


### Bug Fixes

* catch test error ([5efe156](https://github.com/waitingsong/node-win32-api/commit/5efe156))
* createDir() path resolve under linux ([c6d1274](https://github.com/waitingsong/node-win32-api/commit/c6d1274))
* error TS1345: An expression of type 'void' cannot be tested for truthiness ([0085713](https://github.com/waitingsong/node-win32-api/commit/0085713))


### Features

* add Observable functions ([c9364db](https://github.com/waitingsong/node-win32-api/commit/c9364db))
* do isPathAccessible() first within isDirFileExists() ([9ddae98](https://github.com/waitingsong/node-win32-api/commit/9ddae98))
* export native assert() ([683cea8](https://github.com/waitingsong/node-win32-api/commit/683cea8))
* export statAsync ([c832590](https://github.com/waitingsong/node-win32-api/commit/c832590))
* remove log() and logger() ([27e1e29](https://github.com/waitingsong/node-win32-api/commit/27e1e29))
