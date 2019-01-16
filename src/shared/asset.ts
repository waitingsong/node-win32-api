import {
  throwError,
  Observable,
} from 'rxjs'


export function assertNever(x: never): never {
  throw new Error('Assert Never Unexpected object: ' + x)
}
export function assertNeverRx(x: never): Observable<never> {
  return throwError(new Error('Assert Never Unexpected object: ' + x))
}
