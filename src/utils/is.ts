export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== undefined
}

export function isUndef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullOrUndef(val: unknown): val is null | undefined {
  return isUndef(val) && isNull(val)
}
