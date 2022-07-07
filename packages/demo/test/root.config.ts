import { genCurrentDirname } from '@waiting/shared-core'


export const CI = !! process.env.CI
export const testBaseDir = genCurrentDirname(import.meta.url)

