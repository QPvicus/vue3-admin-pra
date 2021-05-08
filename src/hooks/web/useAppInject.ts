import { computed, unref } from 'vue'
import { useAppProviderContext } from '/@/components/Application/src/useAppContext'

export function useAppInject() {
  const values = useAppProviderContext()

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
  }
}
