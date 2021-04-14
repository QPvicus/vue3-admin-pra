import '/@/design/index.less'
import '@virtual/windi.css'

if (import.meta.env.DEV) {
  import('ant-design-vue/dist/antd.less')
}

import { createApp } from 'vue'
import App from './App.vue'
import router, { setRouter } from '/@/router'
import { setStore } from '/@/store'
import { setI18n } from './locales/setupi18n'

import { registerGlobComp } from '/@/components/registerGlobComp'
;(async () => {
  const app = createApp(App)

  registerGlobComp(app)

  await setI18n(app)
  // configure Routing
  setRouter(app)
  setStore(app)

  // Mount when router is ready
  await router.isReady()
  app.mount('#app')
})()
