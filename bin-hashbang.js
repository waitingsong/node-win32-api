#!/usr/bin/env tsx
import { basename } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import assert from 'node:assert'

import pkg from './package.json' with { type: 'json' }

let name = pkg.name

if (name.slice(0, 1) === '@') {
  name = name.split('/')[1]
  if (! name) {
    throw new TypeError('pkg.name invalid')
  }
}
name = parseName(name)
console.log({ name })


if (pkg.bin) {
  // const hashbang = `#!/usr/bin/env node\n\n${banner}`
  // const hashbang = `#!/usr/bin/env ts-node-esm\n\n${banner}`
  const hashbang = `#!/usr/bin/env tsx`

  for (const binPath of Object.values(pkg.bin)) {
    if (! binPath) {
      continue
    }
    const binSrcPath = binPath.includes('bin/') && ! binPath.includes('dist/bin/')
      ? binPath.replace('bin/', 'dist/bin/')
      : binPath

    await binHashbang(binSrcPath , hashbang)
  }

}


/**
 * Prepaend Hashbang to bin file
 */
async function binHashbang(srcFile, hashbang) {
  const content = await readFile(srcFile, 'utf-8')
  if (content.length) {
    if (content.startsWith('#!')) {
      return
    }
    const data = `${hashbang}\n\n${content}`
    await writeFile(srcFile, data, 'utf-8')
  }
}

// remove pkg.name extension if exists
function parseName(name) {
  if (typeof name === 'string' && name) {
    return basename(name)
  }
  else {
    throw new TypeError('name invalid')
  }
}


