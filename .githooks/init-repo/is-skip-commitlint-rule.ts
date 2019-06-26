/**
 * Rules for skipping commintlint or not
 * when some test passed
 * protect has high priority than skip
 */

export const protectBranch = <RegExp[]> [
  /^(master|release)$/,
  /^develop$/,
  /^v.+/,
  /^release-.+/,
]

export const skipMsg = <RegExp[]> [
  /^Merge remote-tracking branch/,
  /test foo/,
]
