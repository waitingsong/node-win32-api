
// https://msdn.microsoft.com/en-us/library/windows/desktop/ms633548(v=vs.85).aspx
export const enum CmdShow {
    // Hides the window and activates another window.
    SW_HIDE = 0,

    // Activates and displays a window. If the window is minimized or maximized, the system restores it to its original size and position. An application should specify this flag when displaying the window for the first time.
    SW_SHOWNORMAL = 1,

    // Activates the window and displays it as a minimized window.
    SW_SHOWMINIMIZED = 2,

    // Activates the window and displays it as a maximized window.
    SW_SHOWMAXIMIZED = 3,

    // Maximizes the specified window.
    SW_MAXIMIZE = 3,

    // Displays a window in its most recent size and position. This value is similar to SW_SHOWNORMAL, except that the window is not activated.
    SW_SHOWNOACTIVATE = 4,

    // Activates the window and displays it in its current size and position.
    SW_SHOW = 5,

    // Minimizes the specified window and activates the next top-level window in the Z order.
    SW_MINIMIZE = 6,

    // Displays the window as a minimized window. This value is similar to SW_SHOWMINIMIZED, except the window is not activated.
    SW_SHOWMINNOACTIVE = 7,

    // Displays the window in its current size and position. This value is similar to SW_SHOW, except that the window is not activated.
    SW_SHOWNA = 8,

    // Activates and displays the window. If the window is minimized or maximized, the system restores it to its original size and position.
    SW_RESTORE = 9,

    // Sets the show state based on the SW_ value specified in the STARTUPINFO structure passed to the CreateProcess function by the program that started the application.
    SW_SHOWDEFAULT = 10,

    // Minimizes a window, even if the thread that owns the window is not responding. This flag should only be used when minimizing windows from a different thread.
    SW_FORCEMINIMIZE = 11,
}
