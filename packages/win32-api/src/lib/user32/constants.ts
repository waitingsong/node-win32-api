/* eslint-disable no-bitwise */

// https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
export const enum CmdShow {
  // Hides the window and activates another window.
  SW_HIDE = 0,

  // Activates and displays a window. If the window is minimized or maximized,
  // the system restores it to its original size and position.
  // An application should specify this flag when displaying the window for the first time.
  SW_SHOWNORMAL = 1,

  // Activates the window and displays it as a minimized window.
  SW_SHOWMINIMIZED = 2,

  // Activates the window and displays it as a maximized window.
  SW_SHOWMAXIMIZED = 3,

  // Maximizes the specified window.
  SW_MAXIMIZE = 3,

  // Displays a window in its most recent size and position.
  // This value is similar to SW_SHOWNORMAL, except that the window is not activated.
  SW_SHOWNOACTIVATE = 4,

  // Activates the window and displays it in its current size and position.
  SW_SHOW = 5,

  // Minimizes the specified window and activates the next top-level window in the Z order.
  SW_MINIMIZE = 6,

  // Displays the window as a minimized window.
  // This value is similar to SW_SHOWMINIMIZED, except the window is not activated.
  SW_SHOWMINNOACTIVE = 7,

  // Displays the window in its current size and position.
  // This value is similar to SW_SHOW, except that the window is not activated.
  SW_SHOWNA = 8,

  // Activates and displays the window.
  // If the window is minimized or maximized,
  // the system restores it to its original size and position.
  SW_RESTORE = 9,

  // Sets the show state based on the SW_ value specified in the STARTUPINFO structure
  // passed to the CreateProcess function by the program that started the application.
  SW_SHOWDEFAULT = 10,

  // Minimizes a window, even if the thread that owns the window is not responding.
  // This flag should only be used when minimizing windows from a different thread.
  SW_FORCEMINIMIZE = 11,
}

// https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-setwindowpos
export const enum CmdSetPos {
  // values for hWndInsertAfter
  HWND_BOTTOM = 1,
  HWND_NOTOPMOST = -2,
  HWND_TOP = 0,
  HWND_TOPMOST = -1,

  // values for uFlags
  SWP_ASYNCWINDOWPOS = 0x4000,
  SWP_DEFERERASE = 0x2000,
  SWP_DRAWFRAME = 0x0020,
  SWP_FRAMECHANGED = 0x0020,
  SWP_HIDEWINDOW = 0x0080,
  SWP_NOACTIVATE = 0x0010,
  SWP_NOCOPYBITS = 0x0100,
  SWP_NOMOVE = 0x0002,
  SWP_NOOWNERZORDER = 0x0200,
  SWP_NOREDRAW = 0x0008,
  SWP_NOREPOSITION = 0x0200,
  SWP_NOSENDCHANGING = 0x0400,
  SWP_NOSIZE = 0x0001,
  SWP_NOZORDER = 0x0004,
  SWP_SHOWWINDOW = 0x0040,
}

/* --------- Window Styles ---------------- */
// https://msdn.microsoft.com/en-us/library/windows/desktop/ms632600(v=vs.85).aspx
export const WS_BORDER = 0x00800000
export const WS_CAPTION = 0x00C00000
export const WS_CHILD = 0x40000000
export const WS_CLIPCHILDREN = 0x02000000
export const WS_CLIPSIBLINGS = 0x04000000
export const WS_DISABLED = 0x08000000
export const WS_DLGFRAME = 0x00400000
export const WS_GROUP = 0x00020000
export const WS_HSCROLL = 0x00100000
export const WS_ICONIC = 0x20000000
export const WS_MAXIMIZE = 0x01000000
export const WS_MAXIMIZEBOX = 0x00010000
export const WS_MINIMIZE = 0x20000000
export const WS_MINIMIZEBOX = 0x00020000
export const WS_OVERLAPPED = 0x00000000
export const WS_POPUP = 0x80000000 // The windows is a pop-up window
export const WS_SIZEBOX = 0x00040000
export const WS_SYSMENU = 0x00080000 // The window has a window menu on its title bar.
export const WS_TABSTOP = 0x00010000
export const WS_THICKFRAME = 0x00040000
export const WS_TILED = 0x00000000
export const WS_VISIBLE = 0x10000000
export const WS_VSCROLL = 0x00200000
export const WS_OVERLAPPEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
  | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX
export const WS_POPUPWINDOW = WS_POPUP | WS_BORDER | WS_SYSMENU
export const WS_TILEDWINDOW = WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU
  | WS_THICKFRAME | WS_MINIMIZEBOX | WS_MAXIMIZEBOX

/* --------- Extended Window Styles ---------------- */
// https://docs.microsoft.com/en-us/windows/win32/winmsg/extended-window-styles
// https://msdn.microsoft.com/en-us/library/windows/desktop/ff700543(v=vs.85).aspx

export const WS_EX_ACCEPTFILES = 0x00000010
export const WS_EX_APPWINDOW = 0x00040000
export const WS_EX_CLIENTEDGE = 0x00000200
export const WS_EX_COMPOSITED = 0x02000000
export const WS_EX_CONTEXTHELP = 0x00000400
export const WS_EX_CONTROLPARENT = 0x00010000
export const WS_EX_DLGMODALFRAME = 0x00000001
export const WS_EX_LAYERED = 0x00080000
export const WS_EX_LAYOUTRTL = 0x00400000
export const WS_EX_LEFT = 0x00000000
export const WS_EX_LEFTSCROLLBAR = 0x00004000
export const WS_EX_LTRREADING = 0x00000000
export const WS_EX_MDICHILD = 0x00000040
export const WS_EX_NOACTIVATE = 0x08000000
export const WS_EX_NOINHERITLAYOUT = 0x00100000
export const WS_EX_NOPARENTNOTIFY = 0x00000004
export const WS_EX_NOREDIRECTIONBITMAP = 0x00200000
export const WS_EX_RIGHT = 0x00001000
export const WS_EX_RIGHTSCROLLBAR = 0x00000000
export const WS_EX_RTLREADING = 0x00002000
export const WS_EX_STATICEDGE = 0x00020000
export const WS_EX_TOOLWINDOW = 0x00000080
export const WS_EX_TOPMOST = 0x00000008
export const WS_EX_TRANSPARENT = 0x00000020
export const WS_EX_WINDOWEDGE = 0x00000100
export const WS_EX_OVERLAPPEDWINDOW = WS_EX_WINDOWEDGE | WS_EX_CLIENTEDGE
export const WS_EX_PALETTEWINDOW = WS_EX_WINDOWEDGE | WS_EX_TOOLWINDOW | WS_EX_TOPMOST

export const PM_NOREMOVE = 0x0000
export const PM_REMOVE = 0x0001
export const PM_NOYIELD = 0x0002

export const CW_USEDEFAULT = 1 << 31

