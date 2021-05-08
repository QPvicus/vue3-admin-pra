import { defineStore } from 'pinia'
import { store } from '..'
import { getPermCodeListById } from '/@/api/sys/user'
import { Menu } from '/@/router/types'

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
  },
})

export const usePermissionWithOut = () => {
  return usePermission(store)
}
