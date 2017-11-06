
import {basename} from 'path';
import * as GT from '../types';
import {apiDef, Win32Fns} from './api';
import {gen_api_opts, parse_windef, load as hload} from '../helper';

export {apiDef};
export {Win32Fns};
export const dllName = basename(__dirname);
export const load = (fns?: GT.FnName[], settings?: GT.LoadSettings) => hload<Win32Fns>(dllName, apiDef, fns, settings);
