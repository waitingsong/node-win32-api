
/**
 * Specifies the clockwise rotation of the display.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ne-wingdi-displayconfig_rotation
 */
export const enum DISPLAYCONFIG_ROTATION {
  DISPLAYCONFIG_ROTATION_IDENTITY = 1,
  DISPLAYCONFIG_ROTATION_ROTATE90 = 2,
  DISPLAYCONFIG_ROTATION_ROTATE180 = 3,
  DISPLAYCONFIG_ROTATION_ROTATE270 = 4,
  DISPLAYCONFIG_ROTATION_FORCE_UINT32 = 0xFFFFFFFF
}

/**
 * Specifies the scaling transformation applied to content displayed
 * on a video present network (VidPN) present path.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ne-wingdi-displayconfig_scaling
 */
export const enum DISPLAYCONFIG_SCALING {
  DISPLAYCONFIG_SCALING_IDENTITY = 1,
  DISPLAYCONFIG_SCALING_CENTERED = 2,
  DISPLAYCONFIG_SCALING_STRETCHED = 3,
  DISPLAYCONFIG_SCALING_ASPECTRATIOCENTEREDMAX = 4,
  DISPLAYCONFIG_SCALING_CUSTOM = 5,
  DISPLAYCONFIG_SCALING_PREFERRED = 128,
  DISPLAYCONFIG_SCALING_FORCE_UINT32 = 0xFFFFFFFF
}

/**
 * Specifies the method that the display uses to create an image on a screen.
 * @link https://docs.microsoft.com/en-us/windows/win32/api/wingdi/ne-wingdi-displayconfig_scanline_ordering
 */
export const enum DISPLAYCONFIG_SCANLINE_ORDERING {
  DISPLAYCONFIG_SCANLINE_ORDERING_UNSPECIFIED = 0,
  DISPLAYCONFIG_SCANLINE_ORDERING_PROGRESSIVE = 1,
  DISPLAYCONFIG_SCANLINE_ORDERING_INTERLACED = 2,
  DISPLAYCONFIG_SCANLINE_ORDERING_INTERLACED_UPPERFIELDFIRST,
  DISPLAYCONFIG_SCANLINE_ORDERING_INTERLACED_LOWERFIELDFIRST = 3,
  DISPLAYCONFIG_SCANLINE_ORDERING_FORCE_UINT32 = 0xFFFFFFFF
}

