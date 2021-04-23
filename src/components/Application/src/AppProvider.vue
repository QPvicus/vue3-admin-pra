<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { prefixCls } from '/@/settings/designSetting'
  import { createAppProviderContext } from './useAppContext'
  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props: {
      prefixCls: propTypes.string.def(prefixCls),
    },
    setup(props, { slots }) {
      const { prefixCls } = toRefs(props)
      const isMobile = ref(false)
      createAppProviderContext({ prefixCls, isMobile })
      return () => slots.default?.()
    },
  })
</script>
