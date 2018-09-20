/** https://docs.microsoft.com/en-us/windows/desktop/api/winbase/nf-winbase-setthreadexecutionstate */
export const enum EXECUTION_STATE {
  /**
   * Enables away mode. This value must be specified with ES_CONTINUOUS.
   * Away mode should be used only by media-recording and media-distribution
   * applications that must perform critical background processing on desktop
   * computers while the computer appears to be sleeping. See Remarks.
   */
  ES_CONTINUOUS = 0x80000000,
  /**
   * Informs the system that the state being set should remain in effect until
   * the next call that uses ES_CONTINUOUS and one of the other state flags is cleared.
   */
  ES_AWAYMODE_REQUIRED = 0x00000040,
  /** Forces the display to be on by resetting the display idle timer. */
  ES_SYSTEM_REQUIRED = 0x00000001,
  /** Forces the system to be in the working state by resetting the system idle timer. */
  ES_DISPLAY_REQUIRED = 0x00000002,
}
