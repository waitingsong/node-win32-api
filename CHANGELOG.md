# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [9.5.0](/compare/v9.4.0...v9.5.0) (2020-06-08)


### Features

* **win32-api:** export Constants 1f6c5eb
* **win32-api:** export CS as alias of Constants 0e2f8e1
* **win32-api:** update Constants b6f352f





# [9.4.0](/compare/v9.3.0...v9.4.0) (2020-06-07)


### Bug Fixes

* **win32-api:** gen_api_opts() 4615eaf


### Features

* **win32-api:** upgrade deps a53ae3e
* **win32-def:** define structure COPYDATASTRUCT 96055f0





# [9.3.0](/compare/v9.2.0...v9.3.0) (2020-03-29)


### Features

* **win32-api:** add user32.PrintWindow() 2ef8b43





# [9.2.0](/compare/v9.1.0...v9.2.0) (2020-02-09)


### Bug Fixes

* **win32-def:** comments of HANDLE fecf53a


### Features

* **win-def:** add union support cadb3da
* **win32-api:** add struct-ext RID_DEVICE_INFO 880b10b
* **win32-api:** add user32.GetRawInputDeviceInfoW() 8f5d45f
* **win32-api:** add user32.GetRawInputDeviceList() dcd6c35
* **win32-api:** add user32.GetWindowRect() b3550bd
* **win32-api:** add user32.SetForegroundWindow() 2b18384
* **win32-def:** add RAWINPUTDEVICELIST structure 14ed2f4
* add user32.GetAltTabInfoW() 3916c8e





# [9.1.0](/compare/v9.0.0...v9.1.0) (2020-02-06)


### Features

* add user EnumDisplayDevicesW() 9a9e321





# [9.0.0](/compare/v8.0.0...v9.0.0) (2020-01-21)


* refactor!: change type of handle from Buffer to number (uint32/uint64) 47be79e


### BREAKING CHANGES

* the apis accept only number|bignum|string, no null any more





# [8.0.0](/compare/v7.1.0...v8.0.0) (2020-01-10)


* chore(win32-def)!: remove deprecated types 99e1e5e


### BREAKING CHANGES

* remove deprecated types





# [7.1.0](/compare/v7.0.2...v7.1.0) (2020-01-10)


### Bug Fixes

* **win32-def:** struct MSG, MSG_Struct miss field lPrivate 81bea5d
* **win32-def:** type of char 3e47988
* **win32-def:** types of the following 9df3f28
* **win32-def:** value of POINTER_32 is `uint32` under x64 73b43ab


### Features

* **win32-api:** define CW_USEDEFAULT in user32/constants.ts 697e4df





## [7.0.2](/compare/v7.0.1...v7.0.2) (2019-12-23)

**Note:** Version bump only for package win32-api





## [7.0.1](/compare/v7.0.0...v7.0.1) (2019-12-23)

**Note:** Version bump only for package win32-api





# [7.0.0](/compare/v6.2.0...v7.0.0) (2019-12-23)


### Bug Fixes

* 'PVOID' not parsed within parse_windef() 3209b6c
* LPBYTE 70cadc1
* missing file marcomap.ts 692efbc
* struct not parsed 0df3999
* USN a246d16
* **types:** parse_windef() 03de209


### chore

* **deps:** use ffi-napi instead of ffi bfa006c


### Features

* add FILETIME structure 2482e79
* **types:** add DllFuncsModel d4b258b
* **types:** change ReturnType of cb of async() from void to any 1f69876
* **types:** expand exported DllFuncsModel with async() method 2cf076a
* **types:** set below @deprecated d480b4b
* add HARDWAREINPUT, HARDWAREINPUT_Struct 3ae64f3
* add isPathAcessible() 01810da
* add KEYBDINPUT, KEYBDINPUT_Struct 8ca6f3f
* add LoadSettings['singleton'] 9be9d53
* add logger() fe705c5
* add LPPOINT d85e0a7
* add MOUSEINPUT, MOUSEINPUT_Struct 60fb063
* add RAWHID, RAWHID_Struct 2e5d09e
* add RAWINPUTHEADER, RAWINPUTHEADER_Struct ca557fa
* add RAWKEYBOARD, RAWKEYBOARD_Struct 9a3c56b
* change types of VOID to number & Buffer & void e129f16
* copy from node-win32-api and update 5e290b1
* export basename() from shared a5ffb0b
* export FModel.Buffer as alias of FModel.FFIBuffer 2a36d0f
* export os.tmpdir() c98a3ab
* rename export name of ww to dataTypes baf5a52
* structure instance has ref() member for ref-struct 2b2b48e
* use lookupRef() instead of retrieve_ref_value() e1f9497
* **types:** change FFIParam to FnParam 8176abe


### Reverts

* to 84d3d698a5b1 d94d128


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
