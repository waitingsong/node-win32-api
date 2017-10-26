import * as ffi from 'ffi';
import * as Conf from './conf';
import * as GT from './types';


export function load<T>(dllName: string, fnDef: GT.Win32FnDefMacro, fns?: GT.FnName[], settings?: GT.LoadSettings): T {
    return ffi.Library(dllName, gen_api_opts(fnDef, fns, settings));
}

export function gen_api_opts(fnDef: GT.Win32FnDefMacro, fns?: GT.FnName[], settings?: GT.LoadSettings): GT.Win32FnDef {
    let opts = <GT.Win32FnDef> {};

    if (fns && Array.isArray(fns) && fns.length) {
        for (let fn of fns) {
            const ps: GT.FnParamsMacro = fnDef[fn];

            if (ps) {
                Object.defineProperty(opts, <string> fn, {
                    value: <GT.FnParams> parse_placeholder(ps, settings),
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
            const ps: GT.FnParamsMacro = fnDef[fn];

            if (ps) {
                Object.defineProperty(opts, <string> fn, {
                    value: <GT.FnParams> parse_placeholder(ps, settings),
                    writable: false,
                    enumerable: true,
                    configurable: false,
                });
            }
        }
    }

    return opts;
}

export function parse_placeholder(ps: GT.FnParamsMacro, settings?: GT.LoadSettings): GT.FnParams {
    if ( ! ps || ! Array.isArray(ps) || ps.length !== 2) {
        throw new Error('parse_placeholder(ps) value of ps invalid');
    }
    const returnParam: GT.FnRetTypeMacro = ps[0];
    const callParams: GT.FnCallParamsMacro = ps[1];
    let res = <GT.FnParams> new Array(2);

    // return param
    res[0] = parse_param_placeholder(returnParam, settings);

    // callling params
    // [ [placeholder, string, string],  [placeholder, string, string], string]
    let targetParams = <GT.FnCallParams> new Array();

    for (let i = 0, len = callParams.length; i < len; i++) {
        targetParams[i] = parse_param_placeholder(returnParam, settings);
    }
    res[1] = targetParams;

    return res;
}


// convert typeof array of param to string such like ['_WIN64_HOLDER_', 'int64', 'int32'], no changed returning when string
export function parse_param_placeholder(param: GT.FFIParamMacro, settings?: GT.LoadSettings): GT.FFIParam {
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
    if (typeof param === 'string') {
        return param;
    }
    else if ( ! param || ! Array.isArray(param) || param.length !== 3) {
        throw new Error('parse_param_placeholder(ps, settings) value of ps invalid');
    }

    let p: GT.FFIParam = '';

    switch (param[0]) {
        case Conf._WIN64_HOLDER:
            p = parse_placeholder_arch(param, <boolean> settings._WIN64);
            break;
        case Conf._UNICODE_HOLDER:
            p = parse_placeholder_unicode(param, <boolean> settings._UNICODE);
            break;
        default:
            throw new Error('the value of param placeholder invlaid:' + param[0]);
    }

    return p;
}


// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
export function parse_placeholder_arch(param: GT.FFIParamMacro, _WIN64: boolean): GT.FFIParam {
    if (typeof param === 'string') {
        return param;
    }
    else if ( ! param || param.length !== 3) {
        throw new Error('_WIN64 macro should be Array and has 3 items');
    }

    return _WIN64 ? param[1] : param[2];
}

// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
export function parse_placeholder_unicode(param: GT.FFIParamMacro, _UNICODE: boolean): GT.FFIParam {
    if (typeof param === 'string') {
        return param;
    }
    else if ( ! param || param.length !== 3) {
        throw new Error('_UNICODE macro should be Array and has 3 items');
    }
    return _UNICODE ? param[1] : param[2];
}
