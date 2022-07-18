/**
 * Virtual-Key Codes
 *
 * @description The following table shows the symbolic constant names, hexadecimal values,
 * and mouse or keyboard equivalents for the virtual-key codes used by the system.
 * The codes are listed in numeric order.
 * @link https://docs.microsoft.com/zh-cn/windows/win32/inputdev/virtual-key-codes?redirectedfrom=MSDN
 * @link https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes?redirectedfrom=MSDN
 */

/** Left mouse button */
export const VK_LBUTTON = 0x01
/** Right mouse button */
export const VK_RBUTTON = 0x02
/** Control-break processing */
export const VK_CANCEL = 0x03
/** Middle mouse button(three - button mouse) */
export const VK_MBUTTON = 0x04
/** X1 mouse button */
export const VK_XBUTTON1 = 0x05
/** X2 mouse button */
export const VK_XBUTTON2 = 0x06
/** BACKSPACE key */
export const VK_BACK = 0x08
/** TAB key */
export const VK_TAB = 0x09
/** CLEAR key */
export const VK_CLEAR = 0x0C
export const VK_RETURN = 0x0D
export const VK_SHIFT = 0x10
export const VK_CONTROL = 0x11
/** ALT key */
export const VK_MENU = 0x12
export const VK_PAUSE = 0x13
/** CAPS LOCK key */
export const VK_CAPITAL = 0x14
/** IME Kana mode */
export const VK_KANA = 0x15
/** IME Hanguel mode(maintained for compatibility; use VK_HANGUL)  */
export const VK_HANGUEL = 0x15
/** IME Hangul mode */
export const VK_HANGUL = 0x15
/** IME On */
export const VK_IME_ON = 0x16
export const VK_JUNJA = 0x17
export const VK_FINAL = 0x18
export const VK_HANJA = 0x19
export const VK_KANJI = 0x19
/** IME Off */
export const VK_IME_OFF = 0x1A
/** ESC key */
export const VK_ESCAPE = 0x1B
/** IME convert */
export const VK_CONVERT = 0x1C
/** IME nonconvert */
export const VK_NONCONVERT = 0x1D
/** IME accept */
export const VK_ACCEPT = 0x1E
/** IME mode change request */
export const VK_MODECHANGE = 0x1F
/** SPACEBAR */
export const VK_SPACE = 0x20
/** PAGE UP key */
export const VK_PRIOR = 0x21
/** PAGE DOWN key */
export const VK_NEXT = 0x22
/** END key */
export const VK_END = 0x23
/** HOME key */
export const VK_HOME = 0x24
/** LEFT ARROW key */
export const VK_LEFT = 0x25
/** UP ARROW key */
export const VK_UP = 0x26
/** RIGHT ARROW key */
export const VK_RIGHT = 0x27
/** DOWN ARROW key */
export const VK_DOWN = 0x28
/** SELECT key */
export const VK_SELECT = 0x29
/** PRINT key */
export const VK_PRINT = 0x2A
/** EXECUTE key */
export const VK_EXECUTE = 0x2B
/** PRINT SCREEN key */
export const VK_SNAPSHOT = 0x2C
/** INS key */
export const VK_INSERT = 0x2D
/** DEL key */
export const VK_DELETE = 0x2E
/** HELP key */
export const VK_HELP = 0x2F
/*
0x30 = 0 key
0x31 = 1 key
0x32 = 2 key
0x33 = 3 key
0x34 = 4 key
0x35 = 5 key
0x36 = 6 key
0x37 = 7 key
0x38 = 8 key
0x39 = 9 key
0x41 = A key
0x42 = B key
0x43 = C key
0x44 = D key
0x45 = E key
0x46 = F key
0x47 = G key
0x48 = H key
0x49 = I key
0x4A = J key
0x4B = K key
0x4C = L key
0x4D = M key
0x4E = N key
0x4F = O key
0x50 = P key
0x51 = Q key
0x52 = R key
0x53 = S key
0x54 = T key
0x55 = U key
0x56 = V key
0x57 = W key
0x58 = X key
0x59 = Y key
0x5A = Z key
*/
/** Left Windows key(Natural keyboard) */
export const VK_LWIN = 0x5B
/** Right Windows key(Natural keyboard) */
export const VK_RWIN = 0x5C
/** Applications key(Natural keyboard) */
export const VK_APPS = 0x5D
/** Computer Sleep key */
export const VK_SLEEP = 0x5F
/** Numeric keypad 0 key */
export const VK_NUMPAD0 = 0x60
/** Numeric keypad 1 key */
export const VK_NUMPAD1 = 0x61
/** Numeric keypad 2 key */
export const VK_NUMPAD2 = 0x62
/** Numeric keypad 3 key */
export const VK_NUMPAD3 = 0x63
/** Numeric keypad 4 key */
export const VK_NUMPAD4 = 0x64
/** Numeric keypad 5 key */
export const VK_NUMPAD5 = 0x65
/** Numeric keypad 6 key */
export const VK_NUMPAD6 = 0x66
/** Numeric keypad 7 key */
export const VK_NUMPAD7 = 0x67
/** Numeric keypad 8 key */
export const VK_NUMPAD8 = 0x68
/** Numeric keypad 9 key */
export const VK_NUMPAD9 = 0x69
/** Multiply key */
export const VK_MULTIPLY = 0x6A
/** Add key */
export const VK_ADD = 0x6B
/** Separator key */
export const VK_SEPARATOR = 0x6C
/** Subtract key */
export const VK_SUBTRACT = 0x6D
/** Decimal key */
export const VK_DECIMAL = 0x6E
/** Divide key */
export const VK_DIVIDE = 0x6F
/** F1 key */
export const VK_F1 = 0x70
export const VK_F2 = 0x71
export const VK_F3 = 0x72
export const VK_F4 = 0x73
export const VK_F5 = 0x74
export const VK_F6 = 0x75
export const VK_F7 = 0x76
export const VK_F8 = 0x77
export const VK_F9 = 0x78
export const VK_F10 = 0x79
export const VK_F11 = 0x7A
export const VK_F12 = 0x7B
export const VK_F13 = 0x7C
export const VK_F14 = 0x7D
export const VK_F15 = 0x7E
export const VK_F16 = 0x7F
export const VK_F17 = 0x80
export const VK_F18 = 0x81
export const VK_F19 = 0x82
export const VK_F20 = 0x83
export const VK_F21 = 0x84
export const VK_F22 = 0x85
export const VK_F23 = 0x86
export const VK_F24 = 0x87
/** NUM LOCK key */
export const VK_NUMLOCK = 0x90
/** SCROLL LOCK key */
export const VK_SCROLL = 0x91
/** Left SHIFT key */
export const VK_LSHIFT = 0xA0
/** Right SHIFT key */
export const VK_RSHIFT = 0xA1
/** Left CONTROL key */
export const VK_LCONTROL = 0xA2
/** Right CONTROL key */
export const VK_RCONTROL = 0xA3
/** Left ALT key */
export const VK_LMENU = 0xA4
/** Right ALT key */
export const VK_RMENU = 0xA5
/** Browser Back key */
export const VK_BROWSER_BACK = 0xA6
/** Browser Forward key */
export const VK_BROWSER_FORWARD = 0xA7
/** Browser Refresh key */
export const VK_BROWSER_REFRESH = 0xA8
/** Browser Stop key */
export const VK_BROWSER_STOP = 0xA9
/** Browser Search key */
export const VK_BROWSER_SEARCH = 0xAA
/** Browser Favorites key */
export const VK_BROWSER_FAVORITES = 0xAB
/** Browser Start and Home key */
export const VK_BROWSER_HOME = 0xAC
/** Volume Mute key */
export const VK_VOLUME_MUTE = 0xAD
/** Volume Down key */
export const VK_VOLUME_DOWN = 0xAE
/** Volume Up key */
export const VK_VOLUME_UP = 0xAF
/** Next Track key */
export const VK_MEDIA_NEXT_TRACK = 0xB0
/** Previous Track key */
export const VK_MEDIA_PREV_TRACK = 0xB1
/** Stop Media key  */
export const VK_MEDIA_STOP = 0xB2
/** Play / Pause Media key */
export const VK_MEDIA_PLAY_PAUSE = 0xB3
/** Start Mail key */
export const VK_LAUNCH_MAIL = 0xB4
/** Select Media key */
export const VK_LAUNCH_MEDIA_SELECT = 0xB5
/** Start Application 1 key */
export const VK_LAUNCH_APP1 = 0xB6
/** Start Application 2 key */
export const VK_LAUNCH_APP2 = 0xB7
/** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the ';:' key  */
export const VK_OEM_1 = 0xBA
/** For any country / region, the '+' key */
export const VK_OEM_PLUS = 0xBB
/** For any country / region, the ',' key */
export const VK_OEM_COMMA = 0xBC
/** For any country / region, the '-' key */
export const VK_OEM_MINUS = 0xBD
/** For any country / region, the '.' key */
export const VK_OEM_PERIOD = 0xBE
/** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '/?' key */
export const VK_OEM_2 = 0xBF
/** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '`~' key  */
export const VK_OEM_3 = 0xC0
/** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '[{' key */
export const VK_OEM_4 = 0xDB
/** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the '\|' key */
export const VK_OEM_5 = 0xDC
/** Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard, the ']}' key */
export const VK_OEM_6 = 0xDD
/**
 * Used for miscellaneous characters; it can vary by keyboard.For the US standard keyboard,
 * the 'single-quote/double-quote' key
 */
export const VK_OEM_7 = 0xDE
/** Used for miscellaneous characters; it can vary by keyboard. */
export const VK_OEM_8 = 0xDF
/** The <> keys on the US standard keyboard, or the \\| key on the non - US 102 - key keyboard  */
export const VK_OEM_102 = 0xE2
/** IME PROCESS key */
export const VK_PROCESSKEY = 0xE5
/**
 * Used to pass Unicode characters as if they were keystrokes.
 * The VK_PACKET key is the low word of a 32 - bit Virtual Key value used for non - keyboard input methods.
 * For more information, see Remark in KEYBDINPUT, SendInput, WM_KEYDOWN, and WM_KEYUP
 */
export const VK_PACKET = 0xE7
/** Attn key */
export const VK_ATTN = 0xF6
/** CrSel key */
export const VK_CRSEL = 0xF7
/** ExSel key */
export const VK_EXSEL = 0xF8
/** Erase EOF key */
export const VK_EREOF = 0xF9
/** Play key */
export const VK_PLAY = 0xFA
/** Zoom key */
export const VK_ZOOM = 0xFB
/** Reserved */
export const VK_NONAME = 0xFC
/** PA1 key */
export const VK_PA1 = 0xFD
/** Clear key */
export const VK_OEM_CLEAR = 0xFE

