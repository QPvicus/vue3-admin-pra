import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH as string),
  routes: [],
})

export function setRouter(app: App<Element>) {
  app.use(router)
}

export default router
