import { configWindiCssPlugin } from './windicss'
import { styleImportPlugins } from './styleImport'
import { configHmrPlugin } from './hmr'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  // const {VITE_USER_MOCK} = viteEnv
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]

  !isBuild && vitePlugins.push(configHmrPlugin())

  // vite-plugin-windicss
  vitePlugins.push(configWindiCssPlugin())

  // vite-plugin-styleImport
  vitePlugins.push(styleImportPlugins())
  return vitePlugins
}
