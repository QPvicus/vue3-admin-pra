<template>
  <div>
    <component :is="tag" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue'

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
      tag: {
        type: String as PropType<'canvas' | 'img'>,
        default: 'canvas',
        validator: (v: string) => ['canvas', 'img'].includes(v),
      },
    },
    setup() {},
  })
</script>
