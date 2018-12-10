import { throwError, Observable } from 'rxjs'


/* istanbul ignore next */
export function assertNever(x: never): never {
  throw new Error('Assert Never Unexpected object: ' + x)
}

/* istanbul ignore next */
export function assertNeverObb(x: never): Observable<never> {
  return throwError(new Error('Assert Never Unexpected object: ' + x))
}
