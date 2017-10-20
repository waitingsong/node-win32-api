import * as W from '../windef';
import * as GT from '../types';
// import * as LT from './types';

export const fnDef: GT.Win32FnDef = {
    InitCommonControlsEx: [W.BOOL, [W.LPINITCOMMONCONTROLSEX]],
};


export interface Win32Fn {
    InitCommonControlsEx(lpInitCtrls: GT.INITCOMMONCONTROLSEX): GT.BOOL;
}
