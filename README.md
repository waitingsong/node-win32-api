# NPM mono repository


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/npm-mono-base.svg)]()
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
| [`demo`]      | [![demo-svg]][demo-ch] | [![demo-d-svg]][demo-d-link] | [![demo-dd-svg]][demo-dd-link] |


[`demo`]: https://github.com/waitingsong/npm-mono-base/tree/master/packages/demo

[demo-svg]: https://img.shields.io/npm/v/kmore.svg?maxAge=86400
[demo-ch]: https://github.com/waitingsong/npm-mono-base/tree/master/packages/demo/CHANGELOG.md
[demo-d-svg]: https://david-dm.org/waitingsong/kmore.svg?path=packages/kmore
[demo-d-link]: https://david-dm.org/waitingsong/kmore.svg?path=packages/kmore
[demo-dd-svg]: https://david-dm.org/waitingsong/kmore/dev-status.svg?path=packages/kmore
[demo-dd-link]: https://david-dm.org/waitingsong/kmore?path=packages/kmore#info=devDependencies

