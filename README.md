# NPM mono repository


[![GitHub tag](https://img.shields.io/github/tag/waitingsong/npm-mono-base.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![](https://img.shields.io/badge/lang-TypeScript-blue.svg)]()
[![ci](https://github.com/waitingsong/npm-mono-base/workflows/ci/badge.svg)](https://github.com/waitingsong/npm-mono-base/actions?query=workflow%3A%22ci%22)
[![codecov](https://codecov.io/gh/waitingsong/npm-mono-base/branch/main/graph/badge.svg?token=Voxor5PtnG)](https://codecov.io/gh/waitingsong/npm-mono-base)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)


以下所有命令行操作都在 `git-bash` 窗口中执行

## 安装全局依赖
```sh
npm i -g c8 lerna rollup tsx
```

## 创建新项目

### 克隆新项目仓库

```sh
git clone git@git.foo.com:<group>/<project> && cd <project>
# 比如
git clone git@git.foo.com:foo/uc && cd uc
```

### 初始化仓库

```sh
# GitLab
git archive --remote=git@github.com:waitingsong/npm-mono-base.git HEAD package.json | tar -x > package.json
# GitHub
curl -kL https://github.com.cnpmjs.org/waitingsong/npm-mono-base/raw/main/package.json > package.json
git add package.json
git commit -m "chore: initialize"
npm run bp:add
git fetch bp -v && git merge bp/main --allow-unrelated-histories -m "Merge remote-tracking branch 'bp/main'"

# 使用目录名作为项目名
sh init-project.sh
# 或者指定项目名
sh init-project.sh @foo/my_project

# 初始化依赖
npm install
```

### 根据模板选择初始化子包

#### 创建目录
```sh
npm run add:pkg my_pkg
```

#### 更新项目配置

1. 更新仓库顶级 `package.json` 文件 `description` 等字段
2. 修改**新建**各子包配置文件 `package.json`
3. 更新本文档 [Packages](#packages) 表格的子包信息

---










## Packages

| Package      | Version                | Dependencies                 | DevDependencies                |
| ------------ | ---------------------- | ---------------------------- | ------------------------------ |
| [`demo`]     | [![main-svg]][main-ch] | [![main-d-svg]][main-d-link] | [![main-dd-svg]][main-dd-link] |
| [`demo-cli`] | [![cli-svg]][cli-ch]   | [![cli-d-svg]][cli-d-link]   | [![cli-dd-svg]][cli-dd-link]   |

## Initialize and install dependencies

run it at first time and any time
```sh
npm run repo:init
```


## Compile

Run under root folder
```sh
npm run build
# specify scope
npm run build @scope/demo-docs
# specify scopes
npm run build @scope/demo-docs @scope/demo-serivce
```


## Update package

```sh
npm run bootstrap
```

## Add package

```sh
npm run add:pkg new_module
```

## Test

- Use `npm run lint` to check code style.
- Use `npm run test` to run unit test.

## Clan or Purge

```sh
# clean build dist, cache and build
npm run clean
# clean and remove all node_modules
npm run purge
```

## Note

- Run `npm run clean` before `npm run build`, if any file under typescript outDir folder was deleted manually.
- Default publish registry is `NPM`, configurated in file `lerna.json`
- Any commands above (such as `npm run build`) running in `Git-Bash` under Windows OS

## License
[MIT](LICENSE)


### Languages
- [English](README.md)
- [中文](README.zh-CN.md)

<br>

[`demo`]: https://github.com/waitingsong/npm-mono-base/tree/main/packages/demo
[main-svg]: https://img.shields.io/npm/v/kmore.svg?maxAge=7200
[main-ch]: https://github.com/waitingsong/kmore/tree/main/packages/demo/CHANGELOG.md


[`demo-cli`]: https://github.com/waitingsong/kmore/tree/main/packages/kmore-cli
[cli-svg]: https://img.shields.io/npm/v/kmore-cli.svg?maxAge=7200
[cli-ch]: https://github.com/waitingsong/kmore/tree/main/packages/kmore-clie/CHANGELOG.md



