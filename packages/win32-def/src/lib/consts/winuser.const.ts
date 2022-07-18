
/**
 * Flash both the window caption and taskbar button.This is equivalent to setting the FLASHW_CAPTION | FLASHW_TRAY flags.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export const FLASHW_ALL = 0x00000003
/**
 * Flash the window caption.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export const FLASHW_CAPTION = 0x00000001
/**
 * Stop flashing. The system restores the window to its original state.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export const FLASHW_STOP = 0
/**
 * Flash continuously, until the FLASHW_STOP flag is set.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export const FLASHW_TIMER = 0x00000004
/**
 * Flash continuously until the window comes to the foreground.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export const FLASHW_TIMERNOFG = 0x0000000C
/**
 * Flash the taskbar button.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-flashwinfo
 */
export const FLASHW_TRAY = 0x00000002

