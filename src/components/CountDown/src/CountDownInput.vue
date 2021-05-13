<template>
  <AInput v-bind="$attrs" :class="prefixCls" :size="size" :value="value">
    <template #addonAfter>
      <CountDownButton
        :size="size"
        :count="count"
        :value="state"
        :before-start-func="sendCodeApi"
      />
    </template>
  </AInput>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue'
  import { Input } from 'ant-design-vue'
  import CountDownButton from './CountDownButton.vue'
  import { propTypes } from '/@/utils/propTypes'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { useRuleFormItem } from '/@/hooks/component/useFormItem'
  export default defineComponent({
    name: 'CountDownInput',
    inheritAttrs: false,
    props: {
      value: propTypes.string,
      size: propTypes.oneOf(['default', 'large', 'small']),
      count: propTypes.number.def(60),
      sendCodeApi: {
        type: Function as PropType<() => boolean>,
        default: null,
      },
    },
    components: {
      [Input.name]: Input,
      CountDownButton,
    },
    setup(props) {
      const { prefixCls } = useDesign('countdown-input')
      const [state] = useRuleFormItem(props)
      return {
        prefixCls,
        state,
      }
    },
  })
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: 0;

      button {
        font-size: 14px;
      }
    }
  }
</style>
