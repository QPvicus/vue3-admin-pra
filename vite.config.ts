import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { createAlias } from './build/vite/alias'
import { wrapperEnv } from './build/utils'
import { creatProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugins/index'
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
          javascriptEnabled: true,
        },
      },
    },
  }
}
