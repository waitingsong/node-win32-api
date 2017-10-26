
import {basename} from 'path';
import * as ffi from 'ffi';
import * as GT from '../types';
import * as W from '../windef';
import * as H from '../helper';
import {fnDef, Win32Fn} from './api';
export {GT as types};
export {W as windef};
export {fnDef as api};

export const dllName = basename(__dirname);

export function load(fns?: GT.FnName[], settings?: GT.LoadSettings): Win32Fn {
    return ffi.Library(dllName, H.gen_api_opts(fnDef, fns, settings));
}
