import * as GT from './types';

export function gen_api_opts(fnDef: GT.Win32FnDef, fns?: GT.Win32FnName[]): GT.Win32FnDef {
    let opts = <GT.Win32FnDef> {};

    if (fns && Array.isArray(fns) && fns.length) {
        for (let fn of fns) {
            const v = fnDef[fn];
            if (v) {
                Object.defineProperty(opts, <string> fn, {
                    value: <GT.Win32FnParam> v,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            }
        }
    }
    else {
        opts = fnDef;
    }
    return opts;
}