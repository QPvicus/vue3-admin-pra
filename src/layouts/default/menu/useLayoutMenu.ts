import { useThrottleFn } from '@vueuse/shared'
import { computed, ref, Ref, unref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { MenuSplitTypeEnum } from '/@/enums/menuEnum'
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
import { useAppInject } from '/@/hooks/web/useAppInject'
import { getChildrenMenus, getCurrentParentPath, getMenus, getShallowMenus } from '/@/router/menus'
import { Menu } from '/@/router/types'
import { usePermission } from '/@/store/modules/permission'

export function useLayoutMenu(splitType: Ref<MenuSplitTypeEnum>) {
  //  Menu array
  const menusRef = ref<Menu[]>([])
  const { currentRoute } = useRouter()
  const { getIsMobile } = useAppInject()
  const permissionStore = usePermission()
  const { setMenuSetting, getIsHorizontal, getSplit } = useMenuSetting()

  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50)

  //  not left and not horizontal
  const splitNotLeft = computed(() => {
    return unref(splitType) !== MenuSplitTypeEnum.LEFT && !unref(getIsHorizontal)
  })

  const getSplitLeft = computed(
    () => !unref(splitType) || unref(splitType) !== MenuSplitTypeEnum.LEFT
  )

  const getSplitTop = computed(() => unref(splitType) === MenuSplitTypeEnum.TOP)

  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTypeEnum.NONE || !unref(getSplit)
  })

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTypeEnum]) => {
      if (unref(splitNotLeft) || unref(getIsMobile)) return

      const { meta } = unref(currentRoute)
      const currentActiveMenu = meta.currentActiveMenu as string
      let parentPath = await getCurrentParentPath(path)
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu)
      }
      parentPath && throttleHandleSplitLeftMenu(parentPath)
    },
    {
      immediate: true,
    }
  )

  // Menu Change
  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus()
    },
    {
      immediate: true,
    }
  )

  // split Menu changes
  watch(
    () => getSplit.value,
    () => {
      if (unref(splitNotLeft)) return
      genMenus()
    }
  )

  //  split left menu
  async function handleSplitLeftMenu(parentPath: string) {
    if (unref(getSplitLeft) || unref(getIsMobile)) return

    //  split mode left
    const children = await getChildrenMenus(parentPath)

    if (!children || !children.length) {
      setMenuSetting({ hidden: true })
      menusRef.value = []
      return
    }

    setMenuSetting({ hidden: false })
    menusRef.value = children
  }

  //  get Menus
  async function genMenus() {
    //  normalType
    if (unref(normalType) || unref(getIsMobile)) {
      menusRef.value = await getMenus()
      return
    }

    //  split-top
    if (unref(getSplitTop)) {
      const shallowMenuList = await getShallowMenus()
      menusRef.value = shallowMenuList
      return
    }
  }

  return { menusRef }
}
