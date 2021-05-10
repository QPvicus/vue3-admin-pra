<template>
  <Menu v-bind="getBindValue"> </Menu>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { Menu } from 'ant-design-vue'
  import type { Menu as MenuType } from '/@/router/types'
  import { propTypes } from '/@/utils/propTypes'
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
    },
    inheritAttrs: false,
    setup(props, { attrs }) {
      const getBindValue = computed(() => ({ ...props, ...attrs }))
      return {
        getBindValue,
      }
    },
  })
</script>
