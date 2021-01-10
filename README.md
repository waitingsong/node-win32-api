# NPM mono repository


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/npm-mono-base.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/lang-TypeScript-blue.svg)]()
[![ci](https://github.com/waitingsong/npm-mono-base/workflows/ci/badge.svg)](https://github.com/waitingsong/npm-mono-base/actions?query=workflow%3A%22ci%22)
[![codecov](https://codecov.io/gh/waitingsong/npm-mono-base/branch/master/graph/badge.svg?token=Voxor5PtnG)](https://codecov.io/gh/waitingsong/npm-mono-base)
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

| Package      | Version                | Dependencies                 | DevDependencies                |
| ------------ | ---------------------- | ---------------------------- | ------------------------------ |
| [`demo`]     | [![main-svg]][main-ch] | [![main-d-svg]][main-d-link] | [![main-dd-svg]][main-dd-link] |
| [`demo-cli`] | [![cli-svg]][cli-ch]   | [![cli-d-svg]][cli-d-link]   | [![cli-dd-svg]][cli-dd-link]   |


## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)


[`demo`]: https://github.com/waitingsong/npm-mono-base/tree/master/packages/demo
[main-svg]: https://img.shields.io/npm/v/kmore.svg?maxAge=86400
[main-ch]: https://github.com/waitingsong/kmore/tree/master/packages/demo/CHANGELOG.md
[main-d-svg]: https://david-dm.org/waitingsong/kmore.svg?path=packages/kmore
[main-d-link]: https://david-dm.org/waitingsong/kmore.svg?path=packages/kmore
[main-dd-svg]: https://david-dm.org/waitingsong/kmore/dev-status.svg?path=packages/kmore
[main-dd-link]: https://david-dm.org/waitingsong/kmore?path=packages/kmore#info=devDependencies

[`demo-cli`]: https://github.com/waitingsong/kmore/tree/master/packages/kmore-cli
[cli-svg]: https://img.shields.io/npm/v/kmore-cli.svg?maxAge=86400
[cli-ch]: https://github.com/waitingsong/kmore/tree/master/packages/kmore-clie/CHANGELOG.md
[cli-d-svg]: https://david-dm.org/waitingsong/kmore.svg?path=packages/kmore-cli
[cli-d-link]: https://david-dm.org/waitingsong/kmore.svg?path=packages/kmore-cli
[cli-dd-svg]: https://david-dm.org/waitingsong/kmore/dev-status.svg?path=packages/kmore-cli
[cli-dd-link]: https://david-dm.org/waitingsong/kmore?path=packages/kmore-cli#info=devDependencies

