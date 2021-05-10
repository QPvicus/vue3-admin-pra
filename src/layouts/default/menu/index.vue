<script lang="tsx">
  import { computed, CSSProperties, defineComponent, PropType, toRef, unref } from 'vue'
  import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnum'
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting'
  import { useAppInject } from '/@/hooks/web/useAppInject'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useGo } from '/@/hooks/web/useGo'
  import { propTypes } from '/@/utils/propTypes'
  import { AppLogo } from '/@/components/Application'
  import { useLayoutMenu } from './useLayoutMenu'
  import { isUrl } from '/@/utils/is'
  import { openWindow } from '/@/utils'
  export default defineComponent({
    name: 'LayoutMenu',
    props: {
      splitType: {
        type: Number as PropType<MenuSplitTypeEnum>,
        default: MenuSplitTypeEnum.NONE,
      },
      theme: propTypes.oneOf(['light', 'dark']),
      isHorizontal: propTypes.bool,
      // menu mode
      menuMode: {
        type: [String] as PropType<Nullable<MenuModeEnum>>,
        default: '',
      },
    },
    setup(props) {
      const go = useGo()
      const {
        getMenuMode,
        getMenuType,
        getMenuTheme,
        getCollapsed,
        getCollapsedShowTitle,
        getAccordion,
        getIsSidebarType,
        getIsHorizontal,
        getSplit,
      } = useMenuSetting()
      const { getShowLogo } = useRootSetting()
      const { getIsMobile } = useAppInject()
      const { prefixCls } = useDesign('layout-menu')
      const { menusRef } = useLayoutMenu(toRef(props, 'splitType'))
      const getComputedMenuMode = computed(() => {
        return unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode)
      })
      const getComputedMenuTheme = computed(() => {
        return props.theme || unref(getMenuTheme)
      })

      const getIsShowLogo = computed(() => {
        return unref(getShowLogo) && unref(getIsSidebarType)
      })

      // TODO: ??
      const getUseScroll = computed(() => {
        return (
          !unref(getIsHorizontal) &&
          (unref(getIsSidebarType) ||
            props.splitType === MenuSplitTypeEnum.LEFT ||
            props.splitType === MenuSplitTypeEnum.NONE)
        )
      })

      const getWrapperStyle = computed(
        (): CSSProperties => {
          return {
            height: `calc(100% - ${unref(getIsShowLogo) ? '48px' : '0px'})`,
          }
        }
      )

      const getLogoClass = computed(() => {
        return [
          `${prefixCls}-logo`,
          unref(getComputedMenuTheme),
          {
            [`${prefixCls}-mobile`]: unref(getIsMobile),
          },
        ]
      })

      const getCommonProps = computed(() => {
        const menus = unref(menusRef)
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          theme: unref(getComputedMenuTheme),
          accordion: unref(getAccordion),
          collapse: unref(getCollapsed),
          collapseShowTitle: unref(getCollapsedShowTitle),
          onMenuClick: handleMenuClick,
        }
      })
      //  go menu
      function handleMenuClick(path: string) {
        go(path)
      }

      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) return true
        openWindow(path)
        return false
      }

      function renderHeader() {
        if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null
        return (
          <AppLogo
            showTitle={unref(getCollapsed)}
            class={unref(getLogoClass)}
            theme={unref(getComputedMenuTheme)}
          />
        )
      }

      function renderMenu() {
        const { menus, ...menuProps } = unref(getCommonProps)
        if (!menus || !menus.length) return null
        return null
      }
      return () => {
        return <>{renderHeader()}</>
      }
    },
  })
</script>
