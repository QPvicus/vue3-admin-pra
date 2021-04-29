import { AppRouteRecordRaw } from '../types'

export const mainOutRoutes: AppRouteRecordRaw[] = [
  {
    path: '/main-out',
    component: () => import('/@/views/demo/main-out/index.vue'),
    name: 'MainOut',
    meta: {
      title: 'MainOut',
      ignoreAuth: true,
    },
  },
]

export const mainOutRouteNames = mainOutRoutes.map((item) => item.name)
