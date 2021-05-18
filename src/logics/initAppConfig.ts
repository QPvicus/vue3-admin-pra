import { useLocaleStore } from '/@/store/modules/locale'
import projectSetting from '/@/settings/projectSetting'
import { useAppStore } from '/@/store/modules/app'
import type { ProjectConfig } from '/#/config'
import { PRO_CFG_KEY } from '../enums/cacheEnum'
import { deepMerge } from '../utils'
import { primaryColor } from '../../build/config/themeConfig'
import { changeTheme } from './theme'
import { updateGrayMode } from './theme/updateGrayMode'
import { updateColorWeak } from './theme/updateColorWeek'
import { updateDarkTheme } from './theme/dark'
import { Persistent } from '../utils/cache/persistent'
import { getCommonStoragePrefix, getStorageShortName } from '../utils/env'

export function initAppConfig() {
  const localStore = useLocaleStore()
  const appStore = useAppStore()
  let projCfg: ProjectConfig = Persistent.getLocal(PRO_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})

  const darkMode = appStore.getDarkMode
  const { colorWeek, grayMode, themeColor } = projCfg

  try {
    if (themeColor && themeColor !== primaryColor) {
      changeTheme(themeColor)

      grayMode && updateGrayMode(grayMode)
      colorWeek && updateColorWeak(colorWeek)
    }
  } catch (err) {
    console.log(err)
  }

  appStore.setProjectConfig(projCfg)
  // init dark mode
  updateDarkTheme(darkMode)
  // if (darkMode === ThemeEnum.DARK) {
  //   //  updateHeaderbgcolor
  //   //  updateSidebarBgcolor
  // } else {

  // }

  //  init locale store
  localStore.initLocale()

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()
  // VUE_VBEN_ADMIN__DEVELOPMENT
  // VUE_VBEN_ADMIN__DEVELOPMENT__1.0.0
  ;[localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
