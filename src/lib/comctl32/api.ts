import * as GT from '../types';
import * as W from '../windef';
// import * as LT from './types';

export interface Win32Fn {
    InitCommonControlsEx(lpInitCtrls: GT.INITCOMMONCONTROLSEX): GT.BOOL;
}

export const apiDef: GT.ApiDef = {
    InitCommonControlsEx: [W.BOOL, [W.LPINITCOMMONCONTROLSEX]],
};
