<template>
  <Menu
    v-bind="getBindValue"
    :activeName="activeName"
    :openNames="getOpenKeys"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu
        :item="item"
        :parent="true"
        :collapse="collapse"
        :collapseShowTitle="collapseShowTitle"
      />
    </template>
  </Menu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, reactive, ref, toRefs, unref, watch } from 'vue'
  import Menu from './components/Menu.vue'
  import SimpleSubMenu from './SimpleSubMenu.vue'
  import type { Menu as MenuType } from '/@/router/types'
  import { propTypes } from '/@/utils/propTypes'
  import type { MenuState } from './types'
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useOpenKeys } from './useOpenKeys'
  import { listenerRouteChange } from '/@/logics/mitt/routeChange'
  import { REDIRECT_NAME } from '/@/router/constant'
  import { isFunction, isUrl } from '/@/utils/is'
  import { openWindow } from '/@/utils'

  export default defineComponent({
    name: 'SimoleMenu',
    components: {
      Menu,
      SimpleSubMenu,
    },
    inheritAttrs: false,
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => [],
      },
      collapse: propTypes.bool,
      mixSider: propTypes.bool,
      theme: propTypes.string,
      accordion: propTypes.bool.def(true),
      collapseShowTitle: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>,
      },
      isSplitMenu: propTypes.bool,
    },
    emits: ['menuClick'],
    setup(props, { attrs, emit }) {
      const curretnActiveMenu = ref('')
      const isClickGo = ref(false)

      const getBindValue = computed(() => ({ ...props, ...attrs }))
      const menuState = reactive<MenuState>({
        activeName: '',
        openNames: [],
        activeSubMenuNames: [],
      })
      const { currentRoute } = useRouter()
      const { prefixCls } = useDesign('simple-menu')

      const { items, accordion, collapse, mixSider } = toRefs(props)
      const { setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        accordion,
        mixSider,
        collapse
      )

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openNames = []
          } else {
            setOpenKeys(currentRoute.value.path)
          }
        },
        {
          immediate: true,
        }
      )

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) {
            return
          }
          setOpenKeys(currentRoute.value.path)
        },
        {
          flush: 'post',
        }
      )

      listenerRouteChange((route) => {
        if (route.path === REDIRECT_NAME) return

        curretnActiveMenu.value = route.meta?.curretnActiveMenu as string
        handleMenuChange(route)

        if (unref(curretnActiveMenu)) {
          menuState.activeName = unref(curretnActiveMenu)
          setOpenKeys(unref(curretnActiveMenu))
        }
      })

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false
          return
        }

        const path = (route || unref(currentRoute)).path
        menuState.activeName = path

        setOpenKeys(path)
      }

      async function handleSelect(key: string) {
        if (isUrl(key)) {
          openWindow(key)
          return
        }
        const { beforeClickFn } = props
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key)
          if (!flag) return
        }
        emit('menuClick', key)
        isClickGo.value = true
        setOpenKeys(key)
        menuState.activeName = key
      }
      return {
        prefixCls,
        getBindValue,
        handleSelect,
        getOpenKeys,
        ...toRefs(menuState),
      }
    },
  })
</script>

<style lang="less">
  @import './index.less';
</style>
