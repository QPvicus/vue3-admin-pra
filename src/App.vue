<template>
  <config-provider>
    <a-button>aaa</a-button>
    hello world
  </config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ConfigProvider, Button } from 'ant-design-vue'
  export default defineComponent({
    name: 'App',
    components: {
      ConfigProvider,
      Button,
    },
  })
</script>
