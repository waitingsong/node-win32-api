import * as M from 'win32-def'
import * as W from 'win32-def/common.def'


export interface Win32Fns {
  //  may be altered or unavailable in future versions of Windows
  NtQueryInformationProcess: (
    ProcessHandle: M.HANDLE,
    ProcessInformationClass: number,
    ProcessInformation: M.PVOID, // _Out_
    ProcessInformationLength: M.ULONG,
    ReturnLength: M.PULONG | null, // _Out_opt_ ppid
  ) => M.NTSTATUS

}


export const apiDef: M.DllFuncs<Win32Fns> = {
  NtQueryInformationProcess: [W.NTSTATUS, [W.HANDLE, W.DWORD32, W.PVOID, W.ULONG, W.PULONG] ],
}

