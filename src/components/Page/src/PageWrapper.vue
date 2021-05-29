<template>
  <h1>Templtea</h1>
  <PageHeader />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { PageHeader } from 'ant-design-vue'
  import { propTypes } from '/@/utils/propTypes'
  export default defineComponent({
    name: 'PageWrapper',
    components: {
      PageHeader,
    },
    props: {
      title: propTypes.bool,
    },
    setup() {},
  })
</script>
