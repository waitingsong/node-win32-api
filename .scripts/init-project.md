
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
