<template>
  <Layout :class="prefixCls">
    <LayoutHeader />
    <router-view />
  </Layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Layout } from 'ant-design-vue'
  import LayoutHeader from './header/index.vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      Layout,
      LayoutHeader,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout')
      return {
        prefixCls,
      }
    },
  })
</script>
