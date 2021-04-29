import { t } from '/@/hooks/web/usei18n'
import type { AppRouteRecordRaw } from '../types'
import { EXCEPTION_COMPONENT, LAYOUT, REDIRECT_NAME } from '../constant'
//  404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
  },
  children: [
    {
      name: 'ErrorPage',
      path: '/:path(.*)*',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
      },
    },
  ],
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  name: REDIRECT_NAME,
  path: '/redirect/:path(.*)',
  component: LAYOUT,
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
  },
}

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'errorlog',
  component: LAYOUT,
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
  },
  children: [
    {
      path: 'list',
      name: 'errorLogList',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: {
        title: t('routes.basic.errorLogList'),
        hideBreadcrumb: true,
      },
    },
  ],
}
