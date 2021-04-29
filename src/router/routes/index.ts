import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic'
import { mainOutRoutes } from './main-out'
import { PageEnum } from '/@/enums/pageEnums'
import { t } from '/@/hooks/web/usei18n'
import type { AppRouteModule, AppRouteRecordRaw } from '../types'

const modules = import.meta.globEager('./modules/**/*.ts')
const routeModuleList: AppRouteModule[] = []
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList]
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
}

export const basicRoutes = [LoginRoute, RootRoute, ...mainOutRoutes, REDIRECT_ROUTE]
