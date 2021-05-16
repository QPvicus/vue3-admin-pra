<template>
  <li>SubMenuITem</li>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, PropType, reactive } from 'vue'
  import { useMenu } from './useMenu'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'SubMenu',
    props: {
      name: {
        type: [String, Number] as PropType<string | number>,
        required: true,
      },
      disbaled: propTypes.bool,
      collapseShowTitle: propTypes.bool,
    },
    setup() {
      const instance = getCurrentInstance()
      const { prefixCls } = useDesign('menu')
      const state = reactive({
        active: false,
        opened: false,
      })

      const date = reactive({
        timeout: null as TimeoutHandler | null,
        mouseInChild: false,
        isChild: false,
      })

      const { getParentSubMenu, getItemStyle, getParentMenu, getParentList } = useMenu(instance)

      return {
        prefixCls,
      }
    },
  })
</script>
