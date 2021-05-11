<template>
  <Menu v-bind="getBindValue"> </Menu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, reactive, ref } from 'vue'
  import Menu from './components/Menu.vue'
  import type { Menu as MenuType } from '/@/router/types'
  import { propTypes } from '/@/utils/propTypes'
  import type { MenuState } from './types'
  import { useRouter } from 'node_modules/vue-router/dist/vue-router'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { toRefs } from 'node_modules/@vueuse/core/dist'
  export default defineComponent({
    name: 'SimoleMenu',
    components: {
      Menu,
    },
    props: {
      item: {
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
    inheritAttrs: false,
    setup(props, { attrs }) {
      const curretnActiveMenu = ref('')
      const getBindValue = computed(() => ({ ...props, ...attrs }))
      const menuState = reactive<MenuState>({
        activeName: '',
        openNames: [],
        activeSubMenuNames: [],
      })
      const { currentRoute } = useRouter()
      const { prefixCls } = useDesign('menu-simple')

      const { item, accordion, collapse, mixSider } = toRefs(props)

      return {
        getBindValue,
      }
    },
  })
</script>
