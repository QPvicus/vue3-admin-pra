import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { wrapperEnv } from './build/utils'
import { createProxy } from './build/vite/proxy'
import { createVitePlugins } from './build/vite/plugins/index'
import { generateModifyVars } from './build/generate/generateModifyVars'
import pkg from './package.json'
import moment from 'moment'
// https://vitejs.dev/config/
function resolvePath(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
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
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    optimizeDeps: {
      exclude: ['vue-demi'],
    },
  }
}
