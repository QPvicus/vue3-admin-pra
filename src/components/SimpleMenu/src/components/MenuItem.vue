<template>
  <li> </li>
</template>

<script lang="ts">
  import { computed, defineComponent, getCurrentInstance, PropType, ref, unref } from 'vue'
  import { useSimpleMenuContext } from './useSimpleMenuContext'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    name: 'MenuItem',
    props: {
      name: {
        type: [String, Number] as PropType<string | number>,
        require: true,
      },
      disabled: propTypes.bool,
    },
    setup(props) {
      const instace = getCurrentInstance()
      const active = ref(false)
      const { prefixCls } = useDesign('menu')

      const { rootMenuEmitter, activeName } = useSimpleMenuContext()
      const getClass = computed(() => {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: unref(active),
            [`${prefixCls}-item-select`]: unref(active),
            [`${prefixCls}-item-disabled`]: !!props.disabled,
          },
        ]
      })
    },
  })
</script>
