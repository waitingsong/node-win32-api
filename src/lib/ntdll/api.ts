import * as GT from '../types'
import W from '../windef-parsed'


export interface Win32Fns {
    //  may be altered or unavailable in future versions of Windows
  NtQueryInformationProcess(
        ProcessHandle: GT.HANDLE,
        ProcessInformationClass: number,
        ProcessInformation: GT.PVOID,       // _Out_
        ProcessInformationLength: GT.ULONG,
        ReturnLength: GT.PULONG | null,    // _Out_opt_ ppid
    ): GT.NTSTATUS

}

export const apiDef: GT.ApiDef = {
  NtQueryInformationProcess: [W.NTSTATUS, [W.HANDLE, W.DWORD32, W.PVOID, W.ULONG, W.PULONG] ],
}
