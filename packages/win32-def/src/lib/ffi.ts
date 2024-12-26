
export type FnCallParam = string | string[] | readonly string[]
export type FnCallParams = FnCallParam[] | readonly FnCallParam[] | never[]
export type FnParamsExpand = string[][]

export function expandFFIParamArray(input: FnCallParams): FnParamsExpand {
  const res: FnParamsExpand = []
  const tmp: string[] = []
  permute(input, 0, tmp, res)
  return res
}

function permute(input: FnCallParams, index: number, current: string[], result: FnParamsExpand): void {
  if (index === input.length) {
    result.push(current)
    return
  }

  const item = input[index]

  if (Array.isArray(item)) {
    const len = item.length

    for (let i = 0; i < len; i += 1) {
      const tmp = item[i] ?? []
      permute(input, index + 1, current.concat(tmp), result)
    }
  }
  else if (typeof item === 'string') {
    permute(input, index + 1, current.concat([item]), result)
  }
  else {
    throw new TypeError('invalid input')
  }
}

