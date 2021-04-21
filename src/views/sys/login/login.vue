<template>
  <AppLogo />
  <LoginForm />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import LoginForm from './LoginForm.vue'
  import AppLogo from '/@/components/Application/src/AppLogo.vue'
  export default defineComponent({
    name: '',
    components: {
      LoginForm,
      AppLogo,
    },
  })
</script>

<style scoped></style>
