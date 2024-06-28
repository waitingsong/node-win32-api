/**
 * @link https://learn.microsoft.com/en-us/windows/win32/winmsg/windowing
 * @link https://learn.microsoft.com/zh-cn/windows/win32/winmsg/window-notifications
 */

export enum WIN_MSG {
  /** https://docs.microsoft.com/zh-cn/windows/win32/winmsg/window-messages */
  MN_GETHMENU = 0x01E1,
  WM_ERASEBKGND = 0x0014,
  WM_GETFONT = 0x0031,
  WM_GETTEXT = 0x000D,
  WM_GETTEXTLENGTH = 0x000E,
  WM_SETFONT = 0x0030,
  WM_SETICON = 0x0080,
  WM_SETTEXT = 0x000C,

  /** https://docs.microsoft.com/zh-cn/windows/win32/winmsg/window-notifications */
  WM_ACTIVATEAPP = 0x001C,
  WM_CANCELMODE = 0x001F,
  WM_CHILDACTIVATE = 0x0022,
  WM_CLOSE = 0x0010,
  WM_CREATE = 0x0001,
  WM_DESTROY = 0x0002,
  WM_ENABLE = 0x000A,
  WM_ENTERSIZEMOVE = 0x0231,
  WM_EXITSIZEMOVE = 0x0232,
  WM_GETICON = 0x007F,
  WM_GETMINMAXINFO = 0x0024,
  WM_INPUTLANGCHANGE = 0x0051,
  WM_INPUTLANGCHANGEREQUEST = 0x0050,
  WM_MOVE = 0x0003,
  WM_MOVING = 0x0216,
  WM_NCACTIVATE = 0x0086,
  WM_NCCALCSIZE = 0x0083,
  WM_NCCREATE = 0x0081,
  WM_NCDESTROY = 0x0082,
  WM_NULL = 0x0000,
  WM_QUERYDRAGICON = 0x0037,
  WM_QUERYOPEN = 0x0013,
  WM_QUIT = 0x0012,
  WM_SHOWWINDOW = 0x0018,
  WM_SIZE = 0x0005,
  WM_SIZING = 0x0214,
  WM_STYLECHANGED = 0x007D,
  WM_STYLECHANGING = 0x007C,
  WM_THEMECHANGED = 0x031A,
  WM_USERCHANGED = 0x0054,
  WM_WINDOWPOSCHANGED = 0x0047,
  WM_WINDOWPOSCHANGING = 0x0046,

  /** https://learn.microsoft.com/en-us/windows/win32/dataxchg/wm-copydata */
  WM_COPYDATA = 0x004A,

  // https://learn.microsoft.com/en-us/windows/win32/menurc/menu-notifications
  WM_COMMAND = 0x0111,
  WM_CONTEXTMENU = 0x007B,
  WM_ENTERMENULOOP = 0x0211,
  WM_EXITMENULOOP = 0x0212,
  WM_GETTITLEBARINFOEX = 0x033F,
  WM_MENUCOMMAND = 0x0126,
  WM_MENUDRAG = 0x0123,
  WM_MENUGETOBJECT = 0x0124,
  WM_MENURBUTTONUP = 0x0122,
  WM_NEXTMENU = 0x0213,
  WM_UNINITMENUPOPUP = 0x0125,

}

