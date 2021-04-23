<template>
  <config-provider>
    <app-provider>
      <router-view />
    </app-provider>
  </config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { ConfigProvider } from 'ant-design-vue'
  import { AppProvider } from '/@/components/Application'
  export default defineComponent({
    name: 'App',
    components: {
      ConfigProvider,
      AppProvider,
    },
    setup() {},
  })
</script>
