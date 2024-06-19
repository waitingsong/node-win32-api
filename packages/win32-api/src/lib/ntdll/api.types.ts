import * as T from 'win32-def'


export interface Win32Fns {
  //  may be altered or unavailable in future versions of Windows
  NtQueryInformationProcess: (
    ProcessHandle: T.HANDLE,
    ProcessInformationClass: number,
    ProcessInformation: T.PVOID, // _Out_
    ProcessInformationLength: T.ULONG,
    ReturnLength: T.PULONG | null, // _Out_opt_ ppid
  ) => T.NTSTATUS

}
