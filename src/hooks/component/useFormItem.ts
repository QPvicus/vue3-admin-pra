import type { UnwrapRef } from 'vue'
import { computed, getCurrentInstance, reactive, readonly, watchEffect } from 'vue'
import { isEqual } from 'lodash-es'

export function useRuleFormItem<T extends Recordable>(
  props: T,
  key: keyof T = 'value',
  changeEvent = 'change'
) {
  const instance = getCurrentInstance()
  const emit = instance?.emit
  const innerState = reactive({
    value: props[key],
  })

  const defaultValue = readonly(innerState)
  watchEffect(() => {
    innerState.value = props[key]
  })

  const state = computed({
    get() {
      return innerState.value
    },
    set(value) {
      if (isEqual(value, defaultValue.value)) return
      innerState.value = value as T[keyof T]
      emit?.(changeEvent, value)
    },
  })

  const setState = (val: UnwrapRef<T[keyof T]>): void => {
    innerState.value = val
  }

  return [state, setState, defaultValue] as const
}
