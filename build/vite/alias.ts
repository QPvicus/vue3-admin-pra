import { resolve } from 'path'

import type { Alias } from 'vite'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

export function createAlias(alias: [string, string][]): Alias[] {
  return alias.map((item) => {
    const [alias, src] = item
    return {
      find: new RegExp(alias),
      replacement: pathResolve(src) + '/',
    }
  })
}
