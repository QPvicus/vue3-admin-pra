<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{
      !isStart
        ? t('component.countdown.normalText')
        : t('component.countdown.sendText', [currentCount])
    }}
  </Button>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, watchEffect } from 'vue'
  import { Button } from 'ant-design-vue'
  import { propTypes } from '/@/utils/propTypes'
  import { useCountDown } from './useCountDown'
  import { isFunction } from '/@/utils/is'
  import { useI18n } from 'vue-i18n'
  export default defineComponent({
    name: 'CountDownButton',
    components: { Button },
    props: {
      value: propTypes.any,
      count: propTypes.number.def(60),
      beforeStartFunc: {
        type: Function as PropType<() => boolean>,
        default: null,
      },
    },
    setup(props) {
      const { currentCount, isStart, reset, start } = useCountDown(props.count)
      const { t } = useI18n()
      const loading = ref(false)
      watchEffect(() => {
        props.value === undefined && reset()
      })

      async function handleStart() {
        const { beforeStartFunc } = props
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true
          try {
            const canStart = await beforeStartFunc()
            canStart && start()
          } finally {
            loading.value = false
          }
        } else {
          start()
        }
      }

      return {
        isStart,
        t,
        currentCount,
        loading,
        handleStart,
      }
    },
  })
</script>
