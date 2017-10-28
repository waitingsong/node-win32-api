
import {basename} from 'path';
import * as GT from '../types';
import * as W from '../windef';
import {apiDef, Win32Fn} from './api';
import {gen_api_opts, parse_windef, load as hload} from '../helper';

export {GT as types};
export const dllName = basename(__dirname);
export const windef: GT.Windef = parse_windef(W);
export const api: GT.ApiDef = gen_api_opts(apiDef);
export const load = (...args: any[]) => hload<Win32Fn>(dllName, apiDef, ...args);
