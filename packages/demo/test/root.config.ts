import { genCurrentDirname } from '@waiting/shared-core'


const CI = !! process.env.CI
export const testBaseDir = genCurrentDirname(import.meta.url)

