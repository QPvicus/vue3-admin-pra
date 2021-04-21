<template>
  <login-form-title v-show="getShow" class="enter-x" />
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import LoginFormTitle from './LoginFormTitle.vue'
  import { useLoginState, LoginStateEnum } from './useLogin'
  export default defineComponent({
    name: 'LoginForm',
    components: {
      LoginFormTitle,
    },
    setup() {
      const { getLoginState } = useLoginState()
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)
      return {
        getShow,
      }
    },
  })
</script>

<style scoped></style>
