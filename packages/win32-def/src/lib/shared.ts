
/* istanbul ignore next */
export function log(...args: any[]) {
  // tslint:disable-next-line
  console.log(args)
}


/* istanbul ignore next */
export function assertNever(x: never): never {
  throw new Error('Assert Never Unexpected object: ' + x)
}
