/**
 * 搜索指定目录以 file.example 文件为基础生成不带后缀的文件为不带 .example 后缀的文件
 */

import { genFileFromExample, join } from '@waiting/shared-core'

import folderArr from './init.config'


const rootDir = join(__dirname, '..')

genFileFromExample(rootDir, folderArr)
  .then(files => {
    console.info('生成文件：', files)
  })
  .catch(console.error)
