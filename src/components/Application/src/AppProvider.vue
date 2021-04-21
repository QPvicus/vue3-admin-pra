<script lang="ts">
  import { defineComponent } from 'vue'
  import { propTypes } from '/@/utils/propTypes'
  import { prefixCls } from '/@/settings/designSetting'
  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props: {
      prefixCls: propTypes.string.def(prefixCls),
    },
    setup(props, { slots }) {
      props
      return () => slots.default?.()
    },
  })
</script>
