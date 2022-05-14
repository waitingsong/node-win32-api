import { relative } from 'node:path'
import { fileURLToPath } from 'node:url'


export const appDir = process.cwd()

export function fileShortPath(importUrl: string): string {
  const path = relative(appDir, fileURLToPath(importUrl)).replace(/\\/ug, '/')
  return path
}

