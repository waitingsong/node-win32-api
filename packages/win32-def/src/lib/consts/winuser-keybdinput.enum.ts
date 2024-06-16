
/**
 * A simulated keyboard event
 * @link https://learn.microsoft.com/en-us/windows/win32/api/winuser/ns-winuser-keybdinput
 */
export enum KEYBDINPUT {
  KEYEVENTF_EXTENDEDKEY = 0x0001,
  KEYEVENTF_KEYUP = 0x0002,
  KEYEVENTF_SCANCODE = 0x0008,
  KEYEVENTF_UNICODE = 0x0004,
}

