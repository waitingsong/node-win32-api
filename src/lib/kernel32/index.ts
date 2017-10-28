
import {basename} from 'path';
import * as GT from '../types';
import {apiDef, Win32Fn} from './api';
import {gen_api_opts, parse_windef, load as hload} from '../helper';

export {apiDef};
export {GT as types};
export const dllName = basename(__dirname);
export const load = (...args: any[]) => hload<Win32Fn>(dllName, apiDef, ...args);
