import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugins/index'
import { generateModifyVars } from './build/generate/generateModifyVars'
// https://vitejs.dev/config/
function resolvePath(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  const isBuild = command === 'build'
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: resolvePath('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: resolvePath('types') + '/',
        },
      ],
    },
    // plugins: [vue(), vueJsx()],
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: generateModifyVars(),
          javascriptEnabled: true,
        },
      },
    },
    define: {
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  }
}
