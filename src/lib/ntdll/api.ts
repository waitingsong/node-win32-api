import { DModel as DM, DTypes as DT, FModel } from 'win32-def'


export interface Win32Fns {
    //  may be altered or unavailable in future versions of Windows
  NtQueryInformationProcess(
        ProcessHandle: DM.HANDLE,
        ProcessInformationClass: number,
        ProcessInformation: DM.PVOID,       // _Out_
        ProcessInformationLength: DM.ULONG,
        ReturnLength: DM.PULONG | null,    // _Out_opt_ ppid
    ): DM.NTSTATUS

}

export const apiDef: FModel.DllFuncs = {
  NtQueryInformationProcess: [DT.NTSTATUS, [DT.HANDLE, DT.DWORD32, DT.PVOID, DT.ULONG, DT.PULONG] ],
}
