import type { MenuModule } from '/@/router/types'
import { t } from '/@/hooks/web/usei18n'

const about: MenuModule = {
  orderNo: 1000000,
  menu: {
    path: '/about/index',
    name: t('routes.dashboard.about'),
  },
}

export default about
