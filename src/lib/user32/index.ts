
import {basename} from 'path';
import * as ffi from 'ffi';
import * as GT from '../types';
import * as W from '../windef';
import * as H from '../helper';
import * as Api from './api';
export {GT as types};
export {W as windef};

export const dllName = basename(__dirname);

export function load(fns?: GT.Win32FnName[]): Api.Win32Fn  {
    return ffi.Library(dllName, H.gen_api_opts(Api.fnDef, fns));
}
