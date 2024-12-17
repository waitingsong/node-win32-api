
/**
 * Virtual-Key Codes
 *
 * @description The following table shows the symbolic constant names, hexadecimal values,
 * and mouse or keyboard equivalents for the virtual-key codes used by the system.
 * The codes are listed in numeric order.
 * @link https://docs.microsoft.com/zh-cn/windows/win32/inputdev/virtual-key-codes?redirectedfrom=MSDN
 * @link https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes?redirectedfrom=MSDN
 */
export enum VirtualKey {
  /** Left mouse button */
  VK_LBUTTON = 0x01,
  /** Right mouse button */
  VK_RBUTTON = 0x02,
  /** Control-break processing */
  VK_CANCEL = 0x03,
  /** Middle mouse button(three - button mouse) */
  VK_MBUTTON = 0x04,
  /** X1 mouse button */
  VK_XBUTTON1 = 0x05,
  /** X2 mouse button */
  VK_XBUTTON2 = 0x06,
  /** BACKSPACE key */
  VK_BACK = 0x08,
  /** TAB key */
  VK_TAB = 0x09,
  /** CLEAR key */
  VK_CLEAR = 0x0C,
  VK_RETURN = 0x0D,
  VK_SHIFT = 0x10,
  VK_CONTROL = 0x11,
  /** ALT key */
  VK_MENU = 0x12,
  VK_PAUSE = 0x13,
  /** CAPS LOCK key */
  VK_CAPITAL = 0x14,
  /** IME Kana mode */
  VK_KANA = 0x15,
  /** IME Hanguel mode(maintained for compatibility; use VK_HANGUL)  */
  // VK_HANGUEL = 0x15,
  /** IME Hangul mode */
  VK_HANGUL = 0x15,
  /** IME On */
  VK_IME_ON = 0x16,
  VK_JUNJA = 0x17,
  VK_FINAL = 0x18,
  VK_HANJA = 0x19,
  VK_KANJI = 0x19,
  /** IME Off */
  VK_IME_OFF = 0x1A,
  /** ESC key */
  VK_ESCAPE = 0x1B,
  /** IME convert */
  VK_CONVERT = 0x1C,
  /** IME nonconvert */
  VK_NONCONVERT = 0x1D,
  /** IME accept */
  VK_ACCEPT = 0x1E,
  /** IME mode change request */
  VK_MODECHANGE = 0x1F,
  /** SPACEBAR */
  VK_SPACE = 0x20,
  /** PAGE UP key */
  VK_PRIOR = 0x21,
  /** PAGE DOWN key */
  VK_NEXT = 0x22,
  /** END key */
  VK_END = 0x23,
  /** HOME key */
  VK_HOME = 0x24,
  /** LEFT ARROW key */
  VK_LEFT = 0x25,
  /** UP ARROW key */
  VK_UP = 0x26,
  /** RIGHT ARROW key */
  VK_RIGHT = 0x27,
  /** DOWN ARROW key */
  VK_DOWN = 0x28,
  /** SELECT key */
  VK_SELECT = 0x29,
  /** PRINT key */
  VK_PRINT = 0x2A,
  /** EXECUTE key */
  VK_EXECUTE = 0x2B,
  /** PRINT SCREEN key */
  VK_SNAPSHOT = 0x2C,
  /** INS key */
  VK_INSERT = 0x2D,
  /** DEL key */
  VK_DELETE = 0x2E,
  /** HELP key */
  VK_HELP = 0x2F,
  /** 0 key */
  VK_0 = 0x30,
  VK_1 = 0x31,
  VK_2 = 0x32,
  VK_3 = 0x33,
  VK_4 = 0x34,
  VK_5 = 0x35,
  VK_6 = 0x36,
  VK_7 = 0x37,
  VK_8 = 0x38,
  VK_9 = 0x39,
  /** A key */
  VK_A = 0x41,
  VK_B = 0x42,
  VK_C = 0x43,
  VK_D = 0x44,
  VK_E = 0x45,
  VK_F = 0x46,
  VK_G = 0x47,
  VK_H = 0x48,
  VK_I = 0x49,
  VK_J = 0x4A,
  VK_K = 0x4B,
  VK_L = 0x4C,
  VK_M = 0x4D,
  VK_N = 0x4E,
  VK_O = 0x4F,
  VK_P = 0x50,
  VK_Q = 0x51,
  VK_R = 0x52,
  VK_S = 0x53,
  VK_T = 0x54,
  VK_U = 0x55,
  VK_V = 0x56,
  VK_W = 0x57,
  VK_X = 0x58,
  VK_Y = 0x59,
  VK_Z = 0x5A,
  /** Left Windows key(Natural keyboard) */
  VK_LWIN = 0x5B,
  /** Right Windows key(Natural keyboard) */
  VK_RWIN = 0x5C,
  /** Applications key(Natural keyboard) */
  VK_APPS = 0x5D,
  /** Computer Sleep key */
  VK_SLEEP = 0x5F,
  /** Numeric keypad 0 key */
  VK_NUMPAD0 = 0x60,
  /** Numeric keypad 1 key */
  VK_NUMPAD1 = 0x61,
  /** Numeric keypad 2 key */
  VK_NUMPAD2 = 0x62,
  /** Numeric keypad 3 key */
  VK_NUMPAD3 = 0x63,
  /** Numeric keypad 4 key */
  VK_NUMPAD4 = 0x64,
  /** Numeric keypad 5 key */
  VK_NUMPAD5 = 0x65,
  /** Numeric keypad 6 key */
  VK_NUMPAD6 = 0x66,
  /** Numeric keypad 7 key */
  VK_NUMPAD7 = 0x67,
  /** Numeric keypad 8 key */
  VK_NUMPAD8 = 0x68,
  /** Numeric keypad 9 key */
  VK_NUMPAD9 = 0x69,
  /** Multiply key */
  VK_MULTIPLY = 0x6A,
  /** Add key */
  VK_ADD = 0x6B,
  /** Separator key */
  VK_SEPARATOR = 0x6C,
  /** Subtract key */
  VK_SUBTRACT = 0x6D,
  /** Decimal key */
  VK_DECIMAL = 0x6E,
  /** Divide key */
  VK_DIVIDE = 0x6F,
  /** F1 key */
  VK_F1 = 0x70,
  VK_F2 = 0x71,
  VK_F3 = 0x72,
  VK_F4 = 0x73,
  VK_F5 = 0x74,
  VK_F6 = 0x75,
  VK_F7 = 0x76,
  VK_F8 = 0x77,
  VK_F9 = 0x78,
  VK_F10 = 0x79,
  VK_F11 = 0x7A,
  VK_F12 = 0x7B,
  VK_F13 = 0x7C,
  VK_F14 = 0x7D,
  VK_F15 = 0x7E,
  VK_F16 = 0x7F,
  VK_F17 = 0x80,
  VK_F18 = 0x81,
  VK_F19 = 0x82,
  VK_F20 = 0x83,
  VK_F21 = 0x84,
  VK_F22 = 0x85,
  VK_F23 = 0x86,
  VK_F24 = 0x87,
  /** NUM LOCK key */
  VK_NUMLOCK = 0x90,
  /** SCROLL LOCK key */
  VK_SCROLL = 0x91,
  /** Left SHIFT key */
  VK_LSHIFT = 0xA0,
  /** Right SHIFT key */
  VK_RSHIFT = 0xA1,
  /** Left CONTROL key */
  VK_LCONTROL = 0xA2,
  /** Right CONTROL key */
  VK_RCONTROL = 0xA3,
  /** Left ALT key */
  VK_LMENU = 0xA4,
  /** Right ALT key */
  VK_RMENU = 0xA5,
  /** Browser Back key */
  VK_BROWSER_BACK = 0xA6,
  /** Browser Forward key */
  VK_BROWSER_FORWARD = 0xA7,
  /** Browser Refresh key */
  VK_BROWSER_REFRESH = 0xA8,
  /** Browser Stop key */
  VK_BROWSER_STOP = 0xA9,
  /** Browser Search key */
  VK_BROWSER_SEARCH = 0xAA,
  /** Browser Favorites key */
  VK_BROWSER_FAVORITES = 0xAB,
  /** Browser Start and Home key */
  VK_BROWSER_HOME = 0xAC,
  /** Volume Mute key */
  VK_VOLUME_MUTE = 0xAD,
  /** Volume Down key */
  VK_VOLUME_DOWN = 0xAE,
  /** Volume Up key */
  VK_VOLUME_UP = 0xAF,
  /** Next Track key */
  VK_MEDIA_NEXT_TRACK = 0xB0,
  /** Previous Track key */
  VK_MEDIA_PREV_TRACK = 0xB1,
  /** Stop Media key  */
  VK_MEDIA_STOP = 0xB2,
  /** Play / Pause Media key */
  VK_MEDIA_PLAY_PAUSE = 0xB3,
  /** Start Mail key */
  VK_LAUNCH_MAIL = 0xB4,
  /** Select Media key */
  VK_LAUNCH_MEDIA_SELECT = 0xB5,
  /** Start Application 1 key */
  VK_LAUNCH_APP1 = 0xB6,
  /** Start Application 2 key */
  VK_LAUNCH_APP2 = 0xB7,
  /** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the ';:' key  */
  VK_OEM_1 = 0xBA,
  /** For any country / region, the '+' key */
  VK_OEM_PLUS = 0xBB,
  /** For any country / region, the ',' key */
  VK_OEM_COMMA = 0xBC,
  /** For any country / region, the '-' key */
  VK_OEM_MINUS = 0xBD,
  /** For any country / region, the '.' key */
  VK_OEM_PERIOD = 0xBE,
  /** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '/?' key */
  VK_OEM_2 = 0xBF,
  /** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '`~' key  */
  VK_OEM_3 = 0xC0,
  /** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '[{' key */
  VK_OEM_4 = 0xDB,
  /** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '\|' key */
  VK_OEM_5 = 0xDC,
  /** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the ']}' key */
  VK_OEM_6 = 0xDD,
  /**
   * Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard,
   * the 'single-quote/double-quote' key
   */
  VK_OEM_7 = 0xDE,
  /** Used for miscellaneous characters; it can vary by keyboard. */
  VK_OEM_8 = 0xDF,
  /** The <> keys on the US standard keyboard, or the \\| key on the non - US 102 - key keyboard  */
  VK_OEM_102 = 0xE2,
  /** IME PROCESS key */
  VK_PROCESSKEY = 0xE5,
  /**
   * Used to pass Unicode characters as if they were keystrokes.
   * The VK_PACKET key is the low word of a 32 - bit Virtual Key value used for non - keyboard input methods.
   * For more information, see Remark in KEYBDINPUT, SendInput, WM_KEYDOWN, and WM_KEYUP
   */
  VK_PACKET = 0xE7,
  /** Attn key */
  VK_ATTN = 0xF6,
  /** CrSel key */
  VK_CRSEL = 0xF7,
  /** ExSel key */
  VK_EXSEL = 0xF8,
  /** Erase EOF key */
  VK_EREOF = 0xF9,
  /** Play key */
  VK_PLAY = 0xFA,
  /** Zoom key */
  VK_ZOOM = 0xFB,
  /** Reserved */
  VK_NONAME = 0xFC,
  /** PA1 key */
  VK_PA1 = 0xFD,
  /** Clear key */
  VK_OEM_CLEAR = 0xFE,
}

