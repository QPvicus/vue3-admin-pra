<template>
  <div>
    <component :is="tag" ref="wrapRef" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'
  import { LogoType, QRCodeRenderersOptions } from './types'

  export default defineComponent({
    name: 'QrCode',
    props: {
      value: {
        type: [String, Array] as PropType<string | any[]>,
        default: null,
      },
      width: {
        type: Number as PropType<number>,
        default: 200,
      },
      options: {
        type: Object as PropType<QRCodeRenderersOptions>,
        default: null,
      },
      logo: {
        type: [String, Object] as PropType<Partial<LogoType> | string>,
        default: '',
      },
      tag: {
        type: String as PropType<'canvas' | 'img'>,
        default: 'canvas',
        validator: (v: string) => ['canvas', 'img'].includes(v),
      },
    },
    setup() {
      const wrapRef = ref<HTMLCanvasElement | HTMLImageElement | null>(null)

      return {
        wrapRef,
      }
    },
  })
</script>
