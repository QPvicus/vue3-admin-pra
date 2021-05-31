<template>
  <span :class="getClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import Icon from '/@/components/Icon'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { propTypes } from '/@/utils/propTypes'
  export default defineComponent({
    name: 'BasicArrow',
    components: {
      Icon,
    },
    props: {
      expand: propTypes.bool,
      top: propTypes.bool,
      bottom: propTypes.bool,
      inset: propTypes.bool,
    },
    setup(props) {
      const { prefixCls } = useDesign('basic-arrow')
      const getClass = computed(() => {
        const { expand, top, bottom, inset } = props
        return [
          prefixCls,
          {
            [`${prefixCls}--active`]: expand,
            top,
            bottom,
            inset,
          },
        ]
      })

      return {
        getClass,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-arrow';
  .@{prefix-cls} {
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(90deg);
    }

    &.inset {
      line-height: 0;
    }

    &.top {
      transform: rotate(-90deg);
    }

    &.bottom {
      transform: rotate(90deg);
    }

    &.bottom.@{prefix-cls}--active {
      transform: rotate(-90deg);
    }
  }
</style>
