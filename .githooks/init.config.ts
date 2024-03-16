/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */

export const folderArr: string[] = [
  './',
  '.vscode',
  '.settings',
  'resource',
  'configs',
  'config', // egg
  'src/config', // midway
]

export const globalConfigFileArr: string[] = [
  '.vscode/tasks.json.example',
  '.vscode/launch.json.example',
  '.vscode/settings.json.example',
  '.vscode/ci.code-snippets.example',
  '.vscode/midway.code-snippets.example',
  './tsconfig.base.json',
  './tsconfig.eslint.json',
  './rollup.config.js',
  './bin-hashbang.js',
]

