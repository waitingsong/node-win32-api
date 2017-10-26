
import {basename} from 'path';
import * as GT from '../types';
import * as W from '../windef';
import {load as hload} from '../helper';
import {fnDef, Win32Fn} from './api';

export {GT as types};
export {W as windef};
export {fnDef as api};
export const dllName = basename(__dirname);
export const load = (...args: any[]) => hload<Win32Fn>(dllName, fnDef, ...args);
