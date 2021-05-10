<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { propTypes } from '/@/utils/propTypes'

  export default defineComponent({
    props: {
      theme: propTypes.oneOf(['light', 'dark']).def('dark'),
      activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
      opneNames: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
      //  开启手风琴模式
      accordion: propTypes.bool.def(true),
      width: propTypes.string.def('100%'),
      collapsedWidth: propTypes.string.def('48px'),
      indentSize: propTypes.number.def(16),
      collaspe: propTypes.bool.def(true),
      activeSubMenuNames: {
        type: Array as PropType<(string | number)[]>,
        default: () => [],
      },
    },
    setup() {},
  })
</script>
