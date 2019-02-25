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
// struct types
export interface StructTypes {
  [prop: string]: FnParam | DataTypes
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
  /** Shorthand for `ref.address`. */
  address(): number
  /** Shorthand for `ref.deref`. */
  deref(): any
  /** Shorthand for `ref.isNull`. */
  isNull(): boolean
  /** Shorthand for `ref.readCString`. */
  readCString(offset?: number): string
  /** Shorthand for `ref.readInt64BE`. */
  readInt64BE(offset?: number): string
  /** Shorthand for `ref.readInt64LE`. */
  readInt64LE(offset?: number): string
  /** Shorthand for `ref.readObject`. */
  readObject(offset?: number): string
  /** Shorthand for `ref.readPointer`. */
  readPointer(offset?: number): string
  /** Shorthand for `ref.readUInt64BE`. */
  readUInt64BE(offset?: number): string
  /** Shorthand for `ref.readUInt64LE`. */
  readUInt64LE(offset?: number): string
  /** Shorthand for `ref.ref`. */
  ref(): FFIBuffer
  /** Shorthand for `ref.reinterpret`. */
  reinterpret(size: number, offset?: number): FFIBuffer
  /** Shorthand for `ref.reinterpretUntilZeros`. */
  reinterpretUntilZeros(size: number, offset?: number): FFIBuffer
  /** Shorthand for `ref.writeCString`. */
  writeCString(offset: number, input: string, encoding?: string): void
  /** Shorthand for `ref.writeInt64BE`. */
  writeInt64BE(offset: number, input: number | string): any
  /** Shorthand for `ref.writeInt64LE`. */
  writeInt64LE(offset: number, input: number | string): any
  /** Shorthand for `ref.writeObject`. */
  writeObject(offset: number, object: Object): void;  // tslint:disable-line
  /** Shorthand for `ref.writePointer`. */
  writePointer(offset: number, pointer: FFIBuffer): void
  /** Shorthand for `ref.writeUInt64BE`. */
  writeUInt64BE(offset: number, input: number | string): any
  /** Shorthand for `ref.writeUInt64LE`. */
  writeUInt64LE(offset: number, input: number | string): any
  /**
   * Generate string for inspecting.
   * String includes the hex-encoded memory address of the Buffer instance.
   */
  inspect(): string
  /** add by waiting. below extened via Buffer.prototype by ref.js */
  hexAddress(): string
}
export {
  FFIBuffer as Buffer,
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

/**
 * usage:
 * ```ts
 * import { DModel as M, FModel as FM } from 'win32-def'
 * export interface Foo extends FM.DllFuncsModel {
 *   SDT_OpenPort(port: M.UINT): M.INT
 *   SDT_ClosePort(): M.INT
 * }
 * ```
 */
export interface DllFuncsModel {
  [funcName: string]: (...args: any[]) => boolean | number | Buffer | void
}
