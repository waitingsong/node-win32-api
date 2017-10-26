import * as Conf from './conf';
import * as GT from './types';


export function gen_api_opts(fnDef: GT.Win32FnDefMacro, fns?: GT.FnName[], settings?: GT.LoadSettings): GT.Win32FnDef {
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

export function parse_placeholder(ps: GT.FnParamsMacro, settings: GT.LoadSettings): GT.FnParams {
    const returnParam: GT.FnRetTypeMacro = ps[0];
    const callParams: GT.FnCallParamsMacro = ps[1];
    let res = <GT.FnParams> new Array(2);

    if (returnParam && Array.isArray(returnParam)) {
        switch (returnParam[0]) {
            case Conf._WIN64_HOLDER:
                res[0] = <GT.FnRetType> parse_placeholder_arch(<GT.FnRetTypeMacro> returnParam, <boolean> settings._WIN64);
                break;
            case Conf._UNICODE_HOLDER:
                res[0] = <GT.FnRetType> parse_placeholder_unicode(<GT.FnRetTypeMacro> returnParam, <boolean> settings._UNICODE);
                break;
            default:
                throw new Error('returnParam value invlaid:' + returnParam[0]);
        }
    }
    else {
        res[0] = returnParam;
    }

    if (callParams) {
        if (Array.isArray(callParams)) {  // [ [placeholder, string, string],  [placeholder, string, string], string]
            let targetParams = <GT.FnCallParams> new Array();

            for (let i = 0, len = callParams.length; i < len; i++) {
                if (callParams[i] &&  typeof callParams[i] === 'string') {
                    targetParams[i] = <string> callParams[i];   // how generic?
                    continue;
                }
                const param = <GT.FnCallParamMacro> callParams[i];
                let paramNew: GT.FnCallParam = '';

                if (param && Array.isArray(param)) {    // [placeholder, string, string]
                    switch (param[0]) {
                        case Conf._WIN64_HOLDER:
                            paramNew = parse_placeholder_arch(<GT.FnRetTypeMacro> param, <boolean> settings._WIN64);
                            break;
                        case Conf._UNICODE_HOLDER:
                            paramNew = parse_placeholder_unicode(<GT.FnRetTypeMacro> param, <boolean> settings._UNICODE);
                            break;
                        default:
                            console.error(callParams);
                            throw new Error('callParams value invlaid:' + param);
                    }
                    targetParams[i] = paramNew;
                }
                else {
                    paramNew = <GT.FnCallParam> param;
                }
            }
            res[1] = targetParams;
        }
    }

    return res;
}

// convert param like ['_WIN64_HOLDER_', 'int64', 'int32] to 'int64' or 'int32'
export function parse_placeholder_arch(param: GT.FnRetTypeMacro, _WIN64: boolean): GT.FnRetType {
    if (typeof param === 'string') {
        return param;
    }
    else if ( ! param || param.length !== 3) {
        throw new Error('_WIN64 macro should be Array and has 3 items');
    }

    return _WIN64 ? param[1] : param[2];
}

// convert param like ['_UNICODE_HOLDER_', 'uint16*', 'uint8*'] to 'uint16*' or 'uint8*'
export function parse_placeholder_unicode(param: GT.FnRetTypeMacro, _UNICODE: boolean): GT.FnRetType {
    if (typeof param === 'string') {
        return param;
    }
    else if ( ! param || param.length !== 3) {
        console.error(param);
        throw new Error('_UNICODE macro should be Array and has 3 items');
    }
    return _UNICODE ? param[1] : param[2];
}
