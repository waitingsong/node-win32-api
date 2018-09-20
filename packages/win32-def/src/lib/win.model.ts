/*  ---------- data types for TypeScript ----------- */


// https://msdn.microsoft.com/en-us/library/windows/desktop/aa383751
export type HWND = Buffer   // for use of hWnd.ref(), deref() etc

export type ATOM = number  // uint16
export type DWORD = number
export type PVOID = number
export type HANDLE = Buffer
export type LONG_PTR = number
export type ULONG_PTR = number
export type VOID = number & Buffer & void
export type WCHAR = string
export type WORD = string

export type BOOL = number  // ?
export type BOOLEAN = boolean
export type BYTE = number
export type CALLBACK = Buffer  // https://msdn.microsoft.com/en-us/library/windows/desktop/ms633573(v=vs.85).aspx
export type CCHAR = string
export type CHAR = string
export type COLORREF = number
// export type CONST;
export type DWORDLONG = number
export type DWORD_PTR = number
export type DWORD32 = number
export type DWORD64 = number
export type FLOAT = number
export type HACCEL = Buffer
export type HALF_PTR = number
export type HBITMAP = Buffer
export type HBRUSH = Buffer
export type HCOLORSPACE = Buffer
export type HCONV = Buffer
export type HCONVLIST = Buffer
export type HCURSOR = Buffer
export type HDC = Buffer
export type HDDEDATA = Buffer
export type HDESK = Buffer
export type HDROP = Buffer
export type HDWP = Buffer
export type HENHMETAFILE = Buffer
export type HFILE = Buffer    // typedef int HFILE;
export type HFONT = Buffer
export type HGDIOBJ = Buffer
export type HGLOBAL = Buffer
export type HHOOK = Buffer
export type HICON = Buffer
export type HINSTANCE = Buffer
export type HKEY = Buffer
export type HKL = Buffer
export type HLOCAL = Buffer
export type HMENU = Buffer
export type HMETAFILE = Buffer
export type HMODULE = Buffer
export type HMONITOR = Buffer
export type HPALETTE = Buffer
export type HPEN = Buffer
export type HRESULT = number
export type HRGN = Buffer
export type HRSRC = Buffer
export type HSZ = Buffer
export type HWINEVENTHOOK = Buffer
export type HWINSTA = Buffer
export type INT = number
export type INT_PTR = number
export type INT8 = number
export type INT16 = number
export type INT32 = number
export type INT64 = number
export type LANGID = number
export type LCID = number
export type LCTYPE = number
export type LGRPID = number
export type LONG = number
export type LONGLONG = number
export type LONG32 = number
export type LONG64 = number
export type LPARAM = number | Buffer
export type LPBOOL = Buffer
export type LPBYTE = Buffer
export type LPCOLORREF = Buffer
export type LPCSTR = Buffer
export type LPCWSTR = Buffer
export type LPCTSTR = Buffer
export type LPVOID = Buffer
export type LPCVOID = Buffer
export type LPDWORD = Buffer
export type LPHANDLE = Buffer
export type LPINT = Buffer
export type LPLONG = Buffer
export type LPMSG = Buffer
export type LPPOINT = Buffer
export type LPSTR = Buffer
export type LPWSTR = Buffer
export type LPTSTR = Buffer
export type LPWORD = Buffer
export type LRESULT = number
export type NTSTATUS = number
export type PBOOL = Buffer
export type PBOOLEAN = Buffer
export type PBYTE = Buffer
export type PCHAR = Buffer
export type PCSTR = Buffer
export type PCTSTR = Buffer
export type PCWSTR = Buffer
export type PDWORD = Buffer
export type PDWORDLONG = Buffer
export type PDWORD_PTR = Buffer
export type PDWORD32 = Buffer
export type PDWORD64 = Buffer
export type PFLOAT = Buffer
export type PHALF_PTR = Buffer
export type PHANDLE = Buffer
export type PHKEY = Buffer
export type PINT = Buffer
export type PINT_PTR = Buffer
export type PINT8 = Buffer
export type PINT16 = Buffer
export type PINT32 = Buffer
export type PINT64 = Buffer
export type PLCID = Buffer
export type PLONG = Buffer
export type PLONGLONG = Buffer
export type PLONG_PTR = Buffer
export type PLONG32 = Buffer
export type PLONG64 = Buffer
export type POINTER_32 = Buffer
export type POINTER_64 = Buffer
export type POINTER_SIGNED = Buffer
export type POINTER_UNSIGNED = Buffer
export type PSHORT = Buffer
export type PSIZE_T = Buffer
export type PSSIZE_T = Buffer
export type PSTR = Buffer
export type PTBYTE = Buffer
export type PTCHAR = Buffer
export type PTSTR = Buffer
export type PUCHAR = Buffer
export type PUHALF_PTR = Buffer
export type PUINT = Buffer
export type PUINT_PTR = Buffer
export type PUINT8 = Buffer
export type PUINT16 = Buffer
export type PUINT32 = Buffer
export type PUINT64 = Buffer
export type PULONG = Buffer
export type PULONGLONG = Buffer
export type PULONG_PTR = Buffer
export type PULONG32 = Buffer
export type PULONG64 = Buffer
export type PUSHORT = Buffer
export type PWCHAR = Buffer
export type PWORD = Buffer
export type PWSTR = Buffer
export type QWORD = Buffer
export type SC_HANDLE = Buffer
export type SC_LOCK = LPVOID
export type SERVICE_STATUS_HANDLE = Buffer
export type SHORT = number
export type SIZE_T = Buffer
export type SSIZE_T = Buffer
export type TBYTE = number
export type TCHAR = string
export type UCHAR = string
export type UHALF_PTR = number
export type UINT = number
export type UINT_PTR = number
export type UINT8 = number
export type UINT16 = number
export type UINT32 = number
export type UINT64 = number
export type ULONG = number
export type ULONGLONG = number
export type ULONG32 = number
export type ULONG64 = number
export type UNICODE_STRING = Buffer
export type USHORT = number
export type USN = number
// export type WINAPI;
export type WINEVENTPROC = Buffer
export type WPARAM = number | Buffer
export type WNDENUMPROC = Buffer
export type WNDPROC = Buffer

export type LPINITCOMMONCONTROLSEX = Buffer  // A pointer to an INITCOMMONCONTROLSEX
export type LPWNDCLASSEX = Buffer  // A pointer to a WNDCLASSEX
export type PWINDOWINFO = Buffer    // A pointer to a WINDOWINFO structure

export type va_list = Buffer

/* ------------------ struct ---------------------- */
export type INITCOMMONCONTROLSEX = Buffer
export interface InitCommonControlsEXStruct {
  dwSize: DWORD
  dwICC: DWORD
}

export type MSG = Buffer
export interface MsgStruct {
  hwnd: HWND
  message: UINT
  wParam: WPARAM
  lParam: LPARAM
  time: DWORD
  pt: POINT
}

export type POINT = Buffer
export interface PointStruct {
  x: LONG
  y: LONG
}

export type WNDCLASSEX = Buffer
export interface WndClassEXStruct {
  cbSize: UINT
  style: UINT
  lpfnWndProc: WNDPROC
  cbClsExtra: INT
  cbWndExtra: INT
  hInstance: HINSTANCE // can be 0?
  hIcon: HICON
  hCursor: HCURSOR
  hbrBackground: HBRUSH
  lpszMenuName: LPCTSTR
  lpszClassName: LPCTSTR
  hIconSm: HICON
}

export type WINDOWINFO = Buffer
export interface WindowInfoStruct {
  cbSize: DWORD
  rcWindow: VOID
  rcClient: VOID
  dwStyle: DWORD
  dwExStyle: DWORD
  dwWindowStatus: DWORD
  cxWindowBorders: UINT
  cyWindowBorders: UINT
  atomWindowType: ATOM
  wCreatorVersion: WORD
}

export type RECT = Buffer
export interface RectStruct {
  left: LONG
  top: LONG
  right: LONG
  bottom: LONG
}
