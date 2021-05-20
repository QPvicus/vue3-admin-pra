import type { Router, RouteRecordRaw } from 'vue-router'
import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic'
import { PageEnum } from '/@/enums/pageEnums'
import { usePermissionWithOut } from '/@/store/modules/permission'
import { useUserStoreWithOut } from '/@/store/modules/user'
const LOGIN_PATH = PageEnum.BASE_LOGIN
const whitePathList: PageEnum[] = [LOGIN_PATH]
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const permissionStore = usePermissionWithOut()
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME)
      return
    }

    // whiteList can be directly enter
    if (whitePathList.includes(to.path as PageEnum)) {
      next()
      return
    }

    const token = userStore.getToken
    if (!token) {
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData.path)
      return
    }

    if (permissionStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    const routes = await permissionStore.buildRoutesAction()
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
    permissionStore.setDynamicAddedRoute(true)
    next(nextData)
  })
}
