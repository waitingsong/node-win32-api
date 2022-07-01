/* eslint-disable import/no-extraneous-dependencies */
import ref from 'ref-napi'
import StructDi from 'ref-struct-di'
import UnionDi from 'ref-union-di'

import { StructDefType } from './ffi.types.js'


// const UnionDi = _UnionDi
const Union = UnionDi(ref)
export function UnionType(input: StructDefType) {
  // @ts-expect-error
  return Union(input)
}
export function UnionFactor<T>(input: StructDefType): T {
  // @ts-expect-error
  return new Union(input)() as unknown as T
}

const Struct = StructDi(ref)
export function StructType(input: StructDefType) {
  // @ts-expect-error
  return Struct(input)
}
export function StructFactory<T>(input: StructDefType): T {
  // @ts-expect-error
  return new Struct(input)() as unknown as T
}

