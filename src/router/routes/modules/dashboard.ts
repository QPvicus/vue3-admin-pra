import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/usei18n'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    title: t('routes.dashboard.dashboard'),
  },
}

export default dashboard
