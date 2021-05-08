import { computed, unref } from 'vue'
import { MenuSetting } from '/#/config'
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum'
import { useAppStore } from '/@/store/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed)
  const getMenuType = computed(() => appStore.getMenuSetting.type)
  const getMenuMode = computed(() => appStore.getMenuSetting.mode)
  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed)
  const getShowMenu = computed(() => appStore.getMenuSetting.show)
  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden)
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth)
  const getTrigger = computed(() => appStore.getMenuSetting.trigger)
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme)
  const getSplit = computed(() => appStore.getMenuSetting.split)
  const getBgColor = computed(() => appStore.getMenuSetting.bgColor)
  const getMixSideTrigger = computed(() => appStore.getMenuSetting.mixSideTrigger)
  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag)
  const getAccordion = computed(() => appStore.getMenuSetting.accordion)
  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed)
  const getTopMenuAlign = computed(() => appStore.getMenuSetting.topMenuAlign)
  const getCloseMixSidebarOnChange = computed(() => appStore.getMenuSetting.closeMixSidebarOnChange)

  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR)
  const getCollapsedShowTitle = computed(() => appStore.getMenuSetting.collapsedShowTitle)
  const getIsHorizontal = computed(() => unref(getMenuMode) === MenuModeEnum.HORIZONTAL)
  // set Menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }

  return {
    getAccordion,
    getBgColor,
    getCanDrag,
    getCloseMixSidebarOnChange,
    getCollapsed,
    getMenuMode,
    getMenuFixed,
    getShowMenu,
    getMenuHidden,
    getMenuWidth,
    getTrigger,
    getMenuTheme,
    getSplit,
    getMixSideTrigger,
    getMixSideFixed,
    getTopMenuAlign,
    getMenuType,

    getCollapsedShowTitle,
    getIsSidebarType,
    getIsHorizontal,

    setMenuSetting,
    toggleCollapsed,
  }
}
