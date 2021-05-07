<template>
  <Header>
    <!-- left  -->
  </Header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useDesign } from '/@/hooks/web/useDesign'
  import { Layout } from 'ant-design-vue'
  export default defineComponent({
    components: {
      Header: Layout.Header,
    },
    setup() {
      const { prefixCls } = useDesign('layout-header')
      return {
        prefixCls,
      }
    },
  })
</script>
