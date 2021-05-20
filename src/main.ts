import '/@/design/index.less'
import 'virtual:windi.css'

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

import 'vite-plugin-svg-icons/register'

import { createApp } from 'vue'
import App from './App.vue'
import router, { setRouter } from '/@/router'
import { setStore } from '/@/store'
import { setI18n } from './locales/setupi18n'
import { initAppConfig } from '/@/logics/initAppConfig'
console.log(import.meta.env)
import { registerGlobComp } from '/@/components/registerGlobComp'
import { setupRouterGuard } from './router/guard'
;(async () => {
  const app = createApp(App)
  setStore(app)

  initAppConfig()

  registerGlobComp(app)

  await setI18n(app)
  // configure Routing
  setRouter(app)

  //  setup router guard
  setupRouterGuard()
  // Mount when router is ready
  await router.isReady()
  app.mount('#app')
})()
