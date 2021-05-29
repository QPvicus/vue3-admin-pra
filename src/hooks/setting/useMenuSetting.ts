import { computed, unref, ref } from 'vue'
import { useFullContent } from '../web/useFullContent'
import { MenuSetting } from '/#/config'
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '/@/enums/appEnums'
import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum'
import { useAppStore } from '/@/store/modules/app'
const mixSideHasChildren = ref(false)
export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const appStore = useAppStore()
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
    )
  })

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
  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
  })
  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX
  })

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth)
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
  })

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
    getShowSidebar,
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
    getIsMixSidebar,

    setMenuSetting,
    toggleCollapsed,
    getIsMixMode,

    getRealWidth,
    getMiniWidthNumber,
    mixSideHasChildren,
  }
}
