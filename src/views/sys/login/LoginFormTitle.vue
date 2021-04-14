<template>
  <h2 class="font-bold text-2xl xl:text-3xl enter-xl text-center xl:text-left mb-6">
    {{ getFormTitle }}
  </h2>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue'
  import { useI18n } from '/@/hooks/web/usei18n'
  import { LoginStateEnum, useLoginState } from './useLogin'
  export default defineComponent({
    name: 'LoginFormTitle',
    setup() {
      const { t } = useI18n()
      const { getLoginState } = useLoginState()
      const getFormTitle = computed(() => {
        const titleObj = {
          [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormTitle'),
          [LoginStateEnum.LOGIN]: t('sys.login.signInFormTitle'),
          [LoginStateEnum.REGISTER]: t('sys.login.signUpFormTitle'),
          [LoginStateEnum.MOBILE]: t('sys.login.signInMobileTitle'),
          [LoginStateEnum.QR_CODE]: t('sys.login.qrsignInFormTitle'),
        }
        return titleObj[unref(getLoginState)]
      })

      return {
        getFormTitle,
      }
    },
  })
</script>
