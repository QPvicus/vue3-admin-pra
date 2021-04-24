import { isObject } from 'lodash'
import { isString } from '../../is'

export function createNow<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object
export function createNow(join: boolean, restful = false): string | object {
  if (!join) return restful ? '' : {}
  const now = new Date().getTime()
  if (restful) {
    return `_t-${now}`
  } else {
    return { _t: now }
  }
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export function formateRequestDate(params: any) {
  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].formate(DATE_TIME_FORMAT)
    }

    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (err) {
          throw new Error(err)
        }
      }
    }
    if (isObject(params[key])) {
      formateRequestDate(params[key])
    }
  }
}
