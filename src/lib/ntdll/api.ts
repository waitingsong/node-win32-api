import * as GT from '../types';
import * as W from '../windef';

export interface Win32Fns {
    //  may be altered or unavailable in future versions of Windows
    NtQueryInformationProcess(
        ProcessHandle: GT.HANDLE,
        ProcessInformationClass: number,
        ProcessInformation: GT.PVOID,       // _Out_
        ProcessInformationLength: GT.ULONG,
        ReturnLength: GT.PULONG    // _Out_opt_ ppid
    ): GT.NTSTATUS;

}

export const apiDef: GT.ApiDef = {
    NtQueryInformationProcess: [W.NTSTATUS, [W.HANDLE, W.DWORD32, W.PVOID, W.ULONG, W.PULONG]],
};
