/**
 * node-win32-api
 *
 * @author waiting
 * @license MIT
 * @link https://github.com/waitingsong/node-win32-api
 */

import * as User32 from './lib/user32/index';
export {User32 as U};
export {User32};

import * as Kernel32 from './lib/kernel32/index';
export {Kernel32 as K};
export {Kernel32};

import * as Comctl32 from './lib/comctl32/index';
export {Comctl32 as C};
export {Comctl32};

import * as DStruct from './lib/struct';
export {DStruct as DS}; // Dict of Struct
export {DStruct};