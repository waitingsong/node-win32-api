import * as Conf from './conf';
import * as GT from './types';

export function gen_api_opts(fnDef: GT.Win32FnDef, fns?: GT.Win32FnName[], settings?: GT.LoadSettings): GT.Win32FnDef {
    if (typeof settings === 'undefined' || ! settings) {
        settings = {
            _UNICODE: true,
            _WIN64: process.arch === 'x64' ? true : false,
        };
    }
    else {
        if (typeof settings._WIN64 === 'undefined') {
            settings._WIN64 = process.arch === 'x64' ? true : false;
        }
        else {
            settings._WIN64 = !!settings._WIN64;
        }
        if (typeof settings._UNICODE === 'undefined') {
            settings._UNICODE = true;
        }
        else {
            settings._UNICODE = !! settings._UNICODE;
        }
    }
    let opts = <GT.Win32FnDef> {};

    if (fns && Array.isArray(fns) && fns.length) {
        for (let fn of fns) {
            const ps: GT.Win32FnParam = fnDef[fn];

            if (ps) {
                parse_placeholder(ps, settings);
                Object.defineProperty(opts, <string> fn, {
                    value: <GT.Win32FnParam> ps,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            }
        }
    }
    else {
        for (let fn in fnDef) {
            if ( ! {}.hasOwnProperty.call(fnDef, fn)) {
                continue;
            }
            const ps: GT.Win32FnParam = fnDef[fn];

            if (ps) {
                parse_placeholder(ps, settings);
                Object.defineProperty(opts, <string> fn, {
                    value: <GT.Win32FnParam> ps,
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            }
        }
        opts = fnDef;
    }
    return opts;
}

export function parse_placeholder(ps: GT.Win32FnParam, settings: GT.LoadSettings): void {
    const returnParam: GT.Win32FnRetType | GT.Win32FnRetType[] = ps[0];
    const callParams: GT.Win32FnCallParam = ps[1];

    if (returnParam && Array.isArray(returnParam)) {
        switch (returnParam[0]) {
            case Conf._WIN64_HOLDER:
                ps[0] = parse_placeholder_arch(<GT.Win32FnRetType[]> returnParam, <boolean> settings._WIN64);
                break;
            case Conf._UNICODE_HOLDER:
                ps[0] = parse_placeholder_unicode(<GT.Win32FnRetType[]> returnParam, <boolean> settings._UNICODE);
                break;
            default:
                throw new Error('returnParam value invlaid:' + returnParam[0]);
        }
    }

    if (callParams && Array.isArray(callParams)) {  // [ [placeholder, string, string],  [placeholder, string, string], string]
        for (let i = 0, len = callParams.length; i < len; i++) {
            const param = callParams[i];

            if (param && Array.isArray(param)) {    // [placeholder, string, string]
                switch (param[0]) {
                    case Conf._WIN64_HOLDER:
                        callParams[i] = parse_placeholder_arch(<GT.Win32FnRetType[]> param, <boolean> settings._WIN64);
                        break;
                    case Conf._UNICODE_HOLDER:
                        callParams[i] = parse_placeholder_unicode(<GT.Win32FnRetType[]> param, <boolean> settings._UNICODE);
                        break;
                    default:
                        console.error(callParams);
                        throw new Error('callParams value invlaid:' + param);
                }
            }
        }
    }

}

// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
export function parse_placeholder_arch(param: GT.Win32FnRetType[], _WIN64: boolean): string {
    if ( ! param || param.length !== 3) {
        console.error(param);
        throw new Error('_WIN64 macro should be Array and has 3 items');
    }
    return _WIN64 ? param[1] : param[2];
}

// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
export function parse_placeholder_unicode(param: GT.Win32FnRetType[], _UNICODE: boolean): string {
    if ( ! param || param.length !== 3) {
        console.error(param);
        throw new Error('_UNICODE macro should be Array and has 3 items');
    }
    return _UNICODE ? param[1] : param[2];
}
