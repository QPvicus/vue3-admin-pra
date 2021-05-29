import { defineStore } from 'pinia'
import { store } from '..'

import type { MenuSetting, ProjectConfig } from '/#/config'
import { ThemeEnum } from '/@/enums/appEnums'
import { APP_DARK_MODE_KEY, PRO_CFG_KEY } from '/@/enums/cacheEnum'
import { darkMode } from '/@/settings/designSetting'
import { deepMerge } from '/@/utils'
import { Persistent } from '/@/utils/cache/persistent'

interface AppState {
  darkMode?: ThemeEnum
  //  page loading status
  pageLoading: boolean
  //  project setting
  projectSetting: ProjectConfig | null
  // ...
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    darkMode: undefined,
    pageLoading: false,
    projectSetting: Persistent.getLocal(PRO_CFG_KEY),
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading
    },
    getDarkMode(): string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY) || darkMode
    },
    getProjectConfig(): ProjectConfig {
      return this.projectSetting || ({} as ProjectConfig)
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(PRO_CFG_KEY, mode)
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>) {
      this.projectSetting = deepMerge(this.projectSetting || {}, config)
      Persistent.setLocal(PRO_CFG_KEY, this.projectSetting)
    },
  },
})

//  need to be outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
