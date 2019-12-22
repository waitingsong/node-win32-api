# win32-api

[![GitHub tag](https://img.shields.io/github/tag/waitingsong/node-win32-api.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
![](https://img.shields.io/badge/lang-TypeScript-blue.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


## Initialization

```sh
npm run repo:init
```


## Update

```sh
npm run bootstrap
```


## Test

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.


## Note

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`


## Packages

| Package       | Version                | Dependencies                 | DevDependencies                |
| ------------- | ---------------------- | ---------------------------- | ------------------------------ |
| [`win32-api`] | [![main-svg]][main-ch] | [![main-d-svg]][main-d-link] | [![main-dd-svg]][main-dd-link] |
| [`win32-def`] | [![def-svg]][def-ch]   | [![def-d-svg]][def-d-link]   | [![def-dd-svg]][def-dd-link]   |


## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)


[`win32-api`]: https://github.com/waitingsong/node-win32-api/tree/master/packages/win32-api
[main-svg]: https://img.shields.io/npm/v/win32-api.svg?maxAge=86400
[main-ch]: https://github.com/waitingsong/node-win32-api/tree/master/packages/win32-api/CHANGELOG.md
[main-d-svg]: https://david-dm.org/waitingsong/node-win32-api.svg?path=packages/win32-api
[main-d-link]: https://david-dm.org/waitingsong/node-win32-api.svg?path=packages/win32-api
[main-dd-svg]: https://david-dm.org/waitingsong/node-win32-api/dev-status.svg?path=packages/win32-api
[main-dd-link]: https://david-dm.org/waitingsong/node-win32-api?path=packages/win32-api#info=devDependencies

[`win32-def`]: https://github.com/waitingsong/node-win32-api/tree/master/packages/win32-def
[def-svg]: https://img.shields.io/npm/v/win32-def.svg?maxAge=86400
[def-ch]: https://github.com/waitingsong/node-win32-def/tree/master/packages/win32-def/CHANGELOG.md
[def-d-svg]: https://david-dm.org/waitingsong/node-win32-def.svg?path=packages/win32-def
[def-d-link]: https://david-dm.org/waitingsong/node-win32-def.svg?path=packages/win32-def
[def-dd-svg]: https://david-dm.org/waitingsong/node-win32-def/dev-status.svg?path=packages/win32-def
[def-dd-link]: https://david-dm.org/waitingsong/node-win32-def?path=packages/win32-def#info=devDependencies


