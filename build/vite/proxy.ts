import type { ServerOptions } from 'http-proxy'

type ProxyItem = [string, string]
type ProxyList = ProxyItem[]
type ProxyTargetList = Record<string, ServerOptions & { rewrite: (path: string) => string }>
const httpRE = /^https:\/\//

//  list = [['/upload', 'http:localhost:3001/upload']]
export function creatProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}
  debugger
  for (const [prefix, target] of list) {
    const isHttps = httpRE.test(target)
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return ret
}
