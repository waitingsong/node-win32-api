
// for win7/8
export const calcLpszClass = Buffer.from('CalcFrame\0', 'ucs2')
// for win10
// export const calcLpszWindow = Buffer.from('Calculator\0', 'ucs2')
// export const calcLpszWindowNotepad = Buffer.from('Notepad\0', 'ucs2')
export const calcLpszWindow = 'Calculator'
export const calcLpszWindowNotepad = 'Notepad'

export const calcLpszClassNotepad = Buffer.from('Notepad\0', 'ucs2')
export const calcLpszClassNotepadEdit = Buffer.from('Edit\0', 'ucs2')

export const calcLpszNotepad = 'Notepad'
export const calcLpszNotepadEdit = 'Edit'

/** GitHub CI */
export const githubPrinterNames = [
  'Microsoft Print to PDF',
  'Microsoft XPS Document Writer',
]

