/**
 * https://docs.microsoft.com/en-us/windows/win32/winmsg/windowing
 */


// https://docs.microsoft.com/zh-cn/windows/win32/winmsg/window-messages
export const MN_GETHMENU = 0x01E1
export const WM_ERASEBKGND = 0x0014
export const WM_GETFONT = 0x0031
export const WM_GETTEXT = 0x000D
export const WM_GETTEXTLENGTH = 0x000E
export const WM_SETFONT = 0x0030
export const WM_SETICON = 0x0080
export const WM_SETTEXT = 0x000C

// https://docs.microsoft.com/zh-cn/windows/win32/winmsg/window-notifications
export const WM_ACTIVATEAPP = 0x001C
export const WM_CANCELMODE = 0x001F
export const WM_CHILDACTIVATE = 0x0022
export const WM_CLOSE = 0x0010
export const WM_CREATE = 0x0001
export const WM_DESTROY = 0x0002
export const WM_ENABLE = 0x000A
export const WM_ENTERSIZEMOVE = 0x0231
export const WM_EXITSIZEMOVE = 0x0232
export const WM_GETICON = 0x007F
export const WM_GETMINMAXINFO = 0x0024
export const WM_INPUTLANGCHANGE = 0x0051
export const WM_INPUTLANGCHANGEREQUEST = 0x0050
export const WM_MOVE = 0x0003
export const WM_MOVING = 0x0216
export const WM_NCACTIVATE = 0x0086
export const WM_NCCALCSIZE = 0x0083
export const WM_NCCREATE = 0x0081
export const WM_NCDESTROY = 0x0082
export const WM_NULL = 0x0000
export const WM_QUERYDRAGICON = 0x0037
export const WM_QUERYOPEN = 0x0013
export const WM_QUIT = 0x0012
export const WM_SHOWWINDOW = 0x0018
export const WM_SIZE = 0x0005
export const WM_SIZING = 0x0214
export const WM_STYLECHANGED = 0x007D
export const WM_STYLECHANGING = 0x007C
export const WM_THEMECHANGED = 0x031A
export const WM_USERCHANGED = 0x0054
export const WM_WINDOWPOSCHANGED = 0x0047
export const WM_WINDOWPOSCHANGING = 0x0046

/** https://docs.microsoft.com/en-us/windows/win32/dataxchg/wm-copydata */
export const WM_COPYDATA = 0x004A

// https://docs.microsoft.com/en-us/windows/win32/menurc/menu-notifications
export const WM_COMMAND = 0x0111
export const WM_CONTEXTMENU = 0x007B
export const WM_ENTERMENULOOP = 0x0211
export const WM_EXITMENULOOP = 0x0212
export const WM_GETTITLEBARINFOEX = 0x033F
export const WM_MENUCOMMAND = 0x0126
export const WM_MENUDRAG = 0x0123
export const WM_MENUGETOBJECT = 0x0124
export const WM_MENURBUTTONUP = 0x0122
export const WM_NEXTMENU = 0x0213
export const WM_UNINITMENUPOPUP = 0x0125

