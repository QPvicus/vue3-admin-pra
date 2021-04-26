import { isObject } from './is'

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameter = ''
  for (const key in obj) {
    parameter += key + '=' + obj[key] + '&'
  }
  parameter.replace(/\&$/, '')
  return /\?$/.test(parameter) ? baseUrl + parameter : baseUrl.replace(/\/?$/, '?') + parameter
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(target[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}
