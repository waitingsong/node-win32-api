// dict of windef value

import { LoadSettings } from './model'

export const _WIN64_HOLDER = '_WIN64_HOLDER_'
export const _UNICODE_HOLDER = '_UNICODE_HOLDER_'
export const windefSkipKeys: Set<string> = new Set(['macroMap'])
/* istanbul ignore next */
export const _WIN64 = process.arch === 'x64' ? true : false
export const _UNICODE = true
export const settingsDefault: LoadSettings = {
    _UNICODE,
    _WIN64,
    _windefClone: false,
    singleton: true,    // for DLL.load()
}


// for validation
export const windefSet = new Set([
    'bool',
    'bool*',

    'byte',

    'char',
    'char*',

    'float',
    'float*',

    'int',
    'int8',
    'int16',
    'int32',
    'int64' ,

    'int*',
    'int8*',
    'int16*',
    'int32*',
    'int64*',

    'uint',
    'uint8',
    'uint16',
    'uint32',
    'uint64',

    'uint*',
    'uint8*',
    'uint16*',
    'uint32*',
    'uint64*',

    'int**',
    'uint32**',
    'uint64**',

    'long',
    'longlong',

    'long*',
    'longlong*',

    'pointer',
    'ushort',

    'void',
    'void*',
])
