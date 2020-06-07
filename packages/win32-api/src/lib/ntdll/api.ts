import { DModel as M, DTypes as W, FModel as FM } from 'win32-def'


export interface Win32Fns extends FM.DllFuncsModel {
  //  may be altered or unavailable in future versions of Windows
  NtQueryInformationProcess: (
    ProcessHandle: M.HANDLE,
    ProcessInformationClass: number,
    ProcessInformation: M.PVOID, // _Out_
    ProcessInformationLength: M.ULONG,
    ReturnLength: M.PULONG | null, // _Out_opt_ ppid
  ) => M.NTSTATUS

}

export const apiDef: FM.DllFuncs = {
  NtQueryInformationProcess: [W.NTSTATUS, [W.HANDLE, W.DWORD32, W.PVOID, W.ULONG, W.PULONG] ],
}
