import { configWindiCssPlugin } from './windicss'
import { styleImportPlugins } from './styleImport'
import { configHmrPlugin } from './hmr'
import { configHtmlPlugin } from './html'
import { configThemePlugin } from './theme'
import { configSvgIconsPlugin } from './svgSprite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import PurgeIcons from 'vite-plugin-purge-icons'

import { configMockPlugin } from './mock'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]
  !isBuild && vitePlugins.push(configHmrPlugin())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-windicss
  vitePlugins.push(configWindiCssPlugin())

  // vite-plugin-styleImport
  vitePlugins.push(styleImportPlugins())

  // vite-plugin-svgSprite
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  //  vite-plugin-purge-icons
  vitePlugins.push(PurgeIcons())

  //  vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild))

  return vitePlugins
}
