import type { Plugin } from 'vite'

import windiCss from 'vite-plugin-windicss'

export function configWindiCssPlugin(): Plugin[] {
  return windiCss({
    safelist: 'no-select',
    preflight: {
      enableAll: true,
    },
  })
}
