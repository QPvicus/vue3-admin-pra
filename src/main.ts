import '/@/design/index.less'
import '@virtual/windi.css'
import { createApp } from 'vue'
import App from './App.vue'

import router, { setRouter } from '/@/router'
import { setStore } from '/@/store'
;(async () => {
  const app = createApp(App)
  // configure Routing
  setRouter(app)
  setStore(app)
  // Mount when router is ready
  await router.isReady()
  app.mount('#app')
})()
