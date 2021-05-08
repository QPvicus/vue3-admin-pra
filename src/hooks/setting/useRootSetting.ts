import { useAppStore } from '/@/store/modules/app'
import { computed } from 'vue'
import { ProjectConfig } from '/#/config'
import { ThemeEnum } from '/@/enums/appEnums'

type RootSetting = Omit<ProjectConfig, 'menuSetting'>

export function useRootSetting() {
  const appStore = useAppStore()

  const getPageLoading = computed(() => appStore.getPageLoading)
  const getShowSettingButton = computed(() => appStore.getProjectConfig.showSettingButton)
  const getUseHandleError = computed(() => appStore.getProjectConfig.useErrorHandler)
  const getThemeColor = computed(() => appStore.getProjectConfig.themeColor)
  const getDarkMode = computed(() => appStore.getDarkMode)
  const getDarkModeToggle = computed(() => appStore.getProjectConfig.showDarkModeToggle)
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting)
  }

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode)
  }

  return {
    getPageLoading,
    getShowSettingButton,
    getUseHandleError,
    getThemeColor,
    getDarkMode,
    getDarkModeToggle,
    getShowLogo,

    setRootSetting,
    setDarkMode,
  }
}
