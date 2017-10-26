
import {basename} from 'path';
import * as GT from '../types';
import * as W from '../windef';
import {gen_api_opts, load as hload} from '../helper';
import {fnDef, Win32Fn} from './api';

export {GT as types};
export {W as windef};
export const api: GT.Win32FnDef = gen_api_opts(fnDef);
export const dllName = basename(__dirname);
export const load = (...args: any[]) => hload<Win32Fn>(dllName, fnDef, ...args);
