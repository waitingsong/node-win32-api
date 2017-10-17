import * as D from '../windef';
import * as GT from '../types';
// import * as LT from './types';

export const fnDef: GT.Win32FnDef = {
    InitCommonControlsEx: [D.BOOL, [D.LPINITCOMMONCONTROLSEX]],
};


export interface Win32Fn {
    InitCommonControlsEx(lpInitCtrls: GT.INITCOMMONCONTROLSEX): GT.BOOL;
}
