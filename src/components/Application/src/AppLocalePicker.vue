<template>
  <Dropdown placement="bottomCenter" trigger="click" overlayClassName="app-locale-picker-overlay">
    a
  </Dropdown>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Dropdown } from 'ant-design-vue'
  import { propTypes } from '/@/utils/propTypes'
  export default defineComponent({
    components: {
      Dropdown,
    },
    props: {
      showText: propTypes.bool.def(true),
      reload: propTypes.bool,
    },
    setup() {},
  })
</script>
