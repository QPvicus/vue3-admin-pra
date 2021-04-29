import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import { REDIRECT_NAME } from './constant'
import { basicRoutes, LoginRoute } from './routes'
const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH as string),
  routes: (basicRoutes as unknown) as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

//  reset router
export function resetRouter() {
  // console.log(router.getRoutes())
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
console.log(router.getRoutes())

export function setRouter(app: App<Element>) {
  app.use(router)
}

export default router
