/* eslint-disable import/no-extraneous-dependencies */
import ref from 'ref-napi'
import StructDi from 'ref-struct-di'
import UnionDi from 'ref-union-di'

import { StructDefType } from './ffi.types.js'


// const UnionDi = _UnionDi
const Union = UnionDi(ref)
export function UnionType<T>(input: StructDefType): T {
  // @ts-expect-error
  return Union(input) as unknown as T
}
export function UnionFactor<T>(input: StructDefType): T {
  // @ts-expect-error
  return new Union(input)() as unknown as T
}

const Struct = StructDi(ref)
export function StructType<T>(input: StructDefType): T {
  // @ts-expect-error
  return Struct(input) as unknown as T
}
export function StructFactory<T>(input: StructDefType): T {
  // @ts-expect-error
  return new Struct(input)() as unknown as T
}

