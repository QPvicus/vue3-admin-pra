import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { createAlias } from './build/vite/alias'
import { wrapperEnv } from './build/utils'
import { creatProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugins/index'
import { generateModifyVars } from './build/generate/generateModifyVars'
// https://vitejs.dev/config/
export default ({ mode, command }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  debugger
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'
  console.log(viteEnv)
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: createAlias([
        ['/@/', 'src'],
        ['/#/', 'types'],
      ]),
    },
    // plugins: [vue(), vueJsx()],
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      port: VITE_PORT,
      proxy: creatProxy(VITE_PROXY),
      hmr: {
        overlay: false,
      },
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
