import { defineStore } from 'pinia'
import { toRaw } from 'vue'
import { store } from '..'
import { useAppStoreWithOut } from './app'
import { useUserStore } from './user'
import { getPermCodeListById } from '/@/api/sys/user'
import { PermissionModeEnum } from '/@/enums/appEnums'
import { useI18n } from '/@/hooks/web/usei18n'
import { asyncRoutes } from '/@/router/routes'
import { ERROR_LOG_ROUTE } from '/@/router/routes/basic'
import { AppRouteRecordRaw, Menu } from '/@/router/types'
import projectSetting from '/@/settings/projectSetting'
import { filter } from '/@/utils/helper/treeHelper'
interface PermissionState {
  permCodeList: string[]
  isDynamicAddedRoute: boolean
  lastBuildMenuTime: number
  backMenuList: Menu[]
}

export const usePermission = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] {
      return this.permCodeList
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },
    setBackMenuList(menuList: Menu[]) {
      this.backMenuList = menuList
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState() {
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
      this.isDynamicAddedRoute = false
    },
    async changePermCodeList(userId: string) {
      const codeList = await getPermCodeListById({ userId })
      this.setPermCodeList(codeList)
    },

    async buildRoutesAction(id?: string | number) {
      const { t } = useI18n()
      const userStore = useUserStore()
      const appStore = useAppStoreWithOut()
      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoleList)
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig
      if (permissionMode === PermissionModeEnum.ROLE) {
        const routerFilter = (route: AppRouteRecordRaw) => {
          const { meta } = route
          const { roles } = meta || {}
          if (!roles) {
            return true
          }
          // 路由中的权限 要匹配  user中的 roleList
          return roleList.some((role) => roles.includes(role))
        }
        routes = filter(asyncRoutes, routerFilter)
        routes = routes.filter(routerFilter)
      } else {
        //  permissionMode === BACK
        t(id as string)
      }

      routes.push(ERROR_LOG_ROUTE)
      return routes
    },
  },
})

export const usePermissionWithOut = () => {
  return usePermission(store)
}
