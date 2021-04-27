export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  }
}

export function resultError(message = 'Request Failed', { code = -1, result = null } = {}) {
  return {
    code,
    message,
    result,
    type: 'error',
  }
}
