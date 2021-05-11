import { tryOnUnmounted } from '@vueuse/shared'
import { ref, watch } from 'vue'
import { isFunction } from '/@/utils/is'

export function useTimeoutFn(handle: Fn, wait: number, native = false) {
  if (!isFunction(handle)) {
    throw new Error('handle is not function')
  }
  const { readyRef, start, stop } = useTimeoutRef(wait)
  if (native) {
    handle()
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle()
      },
      {
        immediate: false,
      }
    )
  }

  return { readyRef, start, stop }
}

export function useTimeoutRef(wait: number) {
  const readyRef = ref(false)
  let timer: TimeoutHandler
  function stop() {
    readyRef.value = false
    timer && window.clearTimeout(timer)
  }

  function start() {
    stop()
    timer = setTimeout(() => {
      readyRef.value = true
    }, wait)
  }

  start()

  tryOnUnmounted(stop)

  return { readyRef, stop, start }
}
