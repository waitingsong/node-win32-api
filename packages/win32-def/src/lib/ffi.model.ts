// for translation of windef
export type MacroParam<T> = T | [T, T, T]  // [s,s,s] for conversion of macro windows data like LPCTSTR
export type MacroDef = [string, string, string]    // ['_WIN64_HOLDER', 'int64*', 'int32*']
export type MacroMap = Map<string, MacroDef>  // <'PVOID', ['_WIN64_HOLDER', 'int64*', 'int32*']>

export type _WIN64 = boolean
export type _UNICODE = boolean

// windows data types
export interface DataTypes {
  [prop: string]: FnParam
}

export interface LoadSettings {
  singleton: boolean  // for DLL.load()
  _UNICODE?: boolean // default true
  _WIN64?: boolean   // default from process.arch
}


/**
 * node-ffi-buffer extends from Buffer
 *
 * I don't found the way to merge the ffi-buffer types automatically
 * so have to copy the def from node-ffi-buffer.d.ts.
 * with it hWnd.ref() wihout error TS2339: Property 'ref' does not exist on type 'Buffer'.
 */
export interface FFIBuffer extends Buffer {
  address(): number
  deref(): any
  isNull(): boolean
  readCString(offset?: number): string
  readInt64BE(offset?: number): string
  readInt64LE(offset?: number): string
  readObject(offset?: number): string
  readPointer(offset?: number): string
  readUInt64BE(offset?: number): string
  readUInt64LE(offset?: number): string
  ref(): FFIBuffer
  reinterpret(size: number, offset?: number): FFIBuffer
  reinterpretUntilZeros(size: number, offset?: number): FFIBuffer
  writeCString(offset: number, input: string, encoding?: string): void
  writeInt64BE(offset: number, input: number | string): any
  writeInt64LE(offset: number, input: number | string): any
  writeObject(offset: number, object: Object): void;  // tslint:disable-line
  writePointer(offset: number, pointer: FFIBuffer): void
  writeUInt64BE(offset: number, input: number | string): any
  writeUInt64LE(offset: number, input: number | string): any
  inspect(): string
  // add by waiting. below extened via Buffer.prototype by ref.js
  hexAddress(): string
}


// custome
export type PID = number
export type PPID = number

export type FnName = string
export type FnParam = string  // param type for definition of FFI
export type FnRetType = FnParam
export type FnCallParam = FnParam   // each param of calling function
export type FnCallParams = FnCallParam[] | never[] // calling params
export type FnParams = [FnRetType, FnCallParams] // def for ffi [returnType, [calling param, ...]]
export interface DllFuncs {
  [fn: string]: FnParams
}
